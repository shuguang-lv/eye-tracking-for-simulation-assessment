"""
function pupil_located(), _analyse() and refresh() are written by https://github.com/antoinelame/GazeTracking
other functions are written by the team
"""

from __future__ import division
import os
import cv2
import dlib
from .eye import Eye
from .calibration import Calibration


class GazeTracking(object):
    """
    This class tracks the user's gaze.
    It provides useful information like the position of the eyes
    and pupils and allows to know if the eyes are open or closed
    """

    def __init__(self):
        self.frame = None
        self.eye_left = None
        self.eye_right = None
        self.calibration = Calibration()

        # _face_detector is used to detect faces
        self._face_detector = dlib.get_frontal_face_detector()

        # _predictor is used to get facial landmarks of a given face
        cwd = os.path.abspath(os.path.dirname(__file__))
        model_path = os.path.abspath(os.path.join(cwd, "trained_models/shape_predictor_68_face_landmarks.dat"))
        self._predictor = dlib.shape_predictor(model_path)

    @property
    def pupils_located(self):
        """Check that the pupils have been located"""
        try:
            int(self.eye_left.pupil.x)
            int(self.eye_left.pupil.y)
            int(self.eye_right.pupil.x)
            int(self.eye_right.pupil.y)
            return True
        except Exception:
            return False

    def _analyze(self):
        """Detects the face and initialize Eye objects"""
        frame = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
        faces = self._face_detector(frame)

        try:
            landmarks = self._predictor(frame, faces[0])
            self.eye_left = Eye(frame, landmarks, 0, self.calibration)
            self.eye_right = Eye(frame, landmarks, 1, self.calibration)

        except IndexError:
            self.eye_left = None
            self.eye_right = None

    def refresh(self, frame):
        """Refreshes the frame and analyzes it.

        Arguments:
            frame (numpy.ndarray): The frame to analyze
        """
        self.frame = frame
        self._analyze()

    def left_gaze_x(self):
        """
        Calculate the x coordinate of the gazing point of left pupil

        Returns:
            the x coordinate of the gazing point of left pupil
        """
        if self.pupils_located:
            x = round(1920 / self.eye_left.eye_weight * self.eye_left.pupil.x, 2)
            return x

    def left_gaze_y(self):
        """
        Calculate the y coordinate of the gazing point of left pupil

        Returns:
            the y coordinate of the gazing point of left pupil
        """
        if self.pupils_located:
            y = round(1080 / self.eye_left.eye_height * self.eye_left.pupil.y, 2)
            return y

    def right_gaze_x(self):
        """
        Calculate the x coordinate of the gazing point of right pupil

        Returns:
            the x coordinate of the gazing point of right pupil
        """
        if self.pupils_located:
            x = round(1920 / self.eye_right.eye_weight * self.eye_right.pupil.x, 2)
            return x

    def right_gaze_y(self):
        """
        Calculate the y coordinate of the gazing point of right pupil

        Returns:
            the y coordinate of the gazing point of right pupil
        """
        if self.pupils_located:
            y = round(1080 / self.eye_right.eye_height * self.eye_right.pupil.y, 2)
            return y

    def pupil_left_coords(self):
        """Returns the coordinates of the left pupil"""
        if self.pupils_located:
            x = self.eye_left.pupil.x
            y = self.eye_left.pupil.y
            return (x, y)

    def pupil_right_coords(self):
        """Returns the coordinates of the right pupil"""
        if self.pupils_located:
            x = self.eye_right.pupil.x
            y = self.eye_right.pupil.y
            return (x, y)

    def set_gazepoints_x(self):
        x_point = int((self.left_gaze_x() + self.right_gaze_x()) / 5 - 540)
        y_point = int((self.left_gaze_y() + self.right_gaze_y()) / 6 - 300)
        return (x_point,y_point)

    def annotated_frame(self):
        """Returns the main frame with pupils highlighted"""
        frame = self.frame.copy()

        if self.pupils_located:
            color = (0, 255, 0)
            x_left, y_left = self.eye_left.origin[0] + self.eye_left.pupil.x, self.eye_left.origin[
                1] + self.eye_left.pupil.y
            x_right, y_right = self.eye_right.origin[0] + self.eye_right.pupil.x, self.eye_right.origin[
                1] + self.eye_right.pupil.y
            # cv2.line(frame, (x_left - 5, y_left), (x_left + 5, y_left), color)
            # cv2.line(frame, (x_left, y_left - 5), (x_left, y_left + 5), color)
            # cv2.line(frame, (x_right - 5, y_right), (x_right + 5, y_right), color)
            # cv2.line(frame, (x_right, y_right - 5), (x_right, y_right + 5), color)

            # x_point = int((self.left_gaze_x() + self.right_gaze_x())/5 - 540)
            # y_point = int((self.left_gaze_y() + self.right_gaze_y())/6 - 300)

            self.set_gazepoints_x()
            # cv2.line(frame, (x_point - 5, y_point), (x_point + 5, y_point), (0, 255, 255))
            # cv2.line(frame, (x_point, y_point - 5), (x_point, y_point + 5), (0, 255, 255))

        return frame

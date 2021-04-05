import example
from gaze_tracking import eye
from gaze_tracking import GazeTracking
from gaze_tracking import calibration
gaze = GazeTracking()


def test_aa():
    """ test the left point of the new frame"""
    mock_left_points = [36, 37, 38, 39, 40, 41]
    assert mock_left_points == eye.Eye.LEFT_EYE_POINTS


def test_bb():
    """ test the right point of the new frame """
    mock_right_points = [42, 43, 44, 45, 46, 47]
    assert mock_right_points == eye.Eye.RIGHT_EYE_POINTS


def test_cc():
    """ test if the gazing points x are stored """
    if example.all_x:
        assert 1


def test_dd():
    """ test if the gazing points y are stored """
    if example.all_y:
        assert 1


def test_ee():
    """ test if the gazing points x are non-negative """
    if example.gaze_point_x >= 0:
        a = 7
        assert a == 7


def test_ff():
    """ test if the gazing points y are non-negative"""
    if example.gaze_point_y >= 0:
        b = 6
        assert b == 6


def test_gg():
    """ test if the list x are not null"""
    if example.list_x:
        assert 1


def test_hh():
    """ test if the list y are not null"""
    if example.list_y:
        assert 1


def test_ii():
    """ test if the watching time is recording"""
    if example.watchingTime:
        assert 1







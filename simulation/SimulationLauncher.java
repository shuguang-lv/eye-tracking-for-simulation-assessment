import java.io.IOException;
import java.awt.*;
import java.awt.event.KeyEvent;

public class SimulationLauncher extends Thread {
    private String batPath;

    private String path = "example.py";
    private PythonLauncher pythonLauncher = new PythonLauncher(path);

    SimulationLauncher(String batPath) {
        this.batPath = "./" + batPath + ".bat";
    }

    @Override
    public void run() {
        Process process;
        try {
            process = Runtime.getRuntime().exec(batPath);
            pythonLauncher.start();
            Robot robot = new Robot();
            robot.delay(5000);
            robot.keyPress(KeyEvent.VK_F11);
            robot.keyRelease(KeyEvent.VK_F11);
            process.waitFor();
            pythonLauncher.des();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (AWTException e) {
            e.printStackTrace();
        }
    }
}

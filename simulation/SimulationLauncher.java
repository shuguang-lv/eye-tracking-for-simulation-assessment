import java.io.IOException;
import java.awt.*;
import java.awt.event.KeyEvent;

public class SimulationLauncher extends Thread {
    private String batPath;

    private String path = "example.py";
    private PythonLauncher pythonLauncher = new PythonLauncher(path);
    private Process process;

    /**
     * constructor
     */
    SimulationLauncher(String batPath) {
        this.batPath = "./" + batPath + ".bat";
    }

    /**
     * start a new process 
     */
    @Override
    public void run() {
        try {
            // execute batch file of simulations
            process = Runtime.getRuntime().exec(batPath);
            // start python launcher
            pythonLauncher.start();
            // virtual key press (enter full-screen mode)
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

    public String getBatPath() {
        return batPath;
    }

    public String getPath() {
        return path;
    }

    public PythonLauncher getPythonLauncher() {
        return pythonLauncher;
    }

    public Process getProcess() {
        return process;
    }
}

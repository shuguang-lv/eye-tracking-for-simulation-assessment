import java.io.IOException;

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
            process.waitFor();
            pythonLauncher.des();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

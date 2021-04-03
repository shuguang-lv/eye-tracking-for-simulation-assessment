import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.TimeUnit;

/**
 * To test if the thread "PythonLauncher" launches eye tracking process (python
 * script) successfully. If eye tracking process is launched successfully, the
 * thread's state should be RUNNABLE at first. In order to test the process is
 * remaining existence, the team makes the main test thread sleep, then the
 * thread's state should be WAITING and the process should be alive, which means
 * the "isAlive()" function of the process should be true. Finally, the thread
 * is destroyed, which means the thread's state turns to TERMINATED and the
 * process is no longer alive.
 */
public class PythonLauncherTest {
    String path = "example.py";
    public PythonLauncher pythonLauncher = new PythonLauncher(path);

    @Test
    public void testRunPython() {
        pythonLauncher.start();
        Assert.assertEquals(Thread.State.RUNNABLE, pythonLauncher.getState());
        try {
            TimeUnit.SECONDS.sleep(5);
            Assert.assertEquals(Thread.State.WAITING, pythonLauncher.getState());
            Assert.assertEquals(true, pythonLauncher.getProcess().isAlive());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        pythonLauncher.des();
        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Assert.assertEquals(Thread.State.TERMINATED, pythonLauncher.getState());
        Assert.assertEquals(false, pythonLauncher.getProcess().isAlive());
    }
}

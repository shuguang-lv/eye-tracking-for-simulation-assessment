import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.TimeUnit;

/**
 * To test if the thread "SimulationLauncher" launches simulation process
 * successfully. When the thread starts to run, the thread's state should be
 * RUNNABLE and one new thread called "PythonLauncher" has the state NEW. Two
 * threads create two processes. One is executing batch file in Windows (Unix
 * Executable File in Mac, Shell Script in Linux) which creates another child
 * process to run simulation, while another one is eye tracking process. After
 * setting sleep time, two threads' state are TIMED\_WAITING and WAITING
 * respectively. After destroying "SimulationLauncher" thread, the states of two
 * threads should be TERMINATED and two processes created by these two threads
 * are also no longer alive. However, the process running simulation cannot be
 * tested by Junit, as it is launched by batch file. Thus, in Java code, the
 * team cannot get the state of the process, but the process' state can be
 * tested by developers themselves. If simulation is playing, the process is
 * running; otherwise, the process exits. These two phenomena can be observed
 * easily by developers.
 */
public class SimulationLauncherTest {
    String simulationPath1 = "AirDefense.bat";
    public SimulationLauncher simulationLauncher = new SimulationLauncher(simulationPath1);

    @Test
    public void testRunSimulation() {
        simulationLauncher.start();
        Assert.assertEquals(Thread.State.RUNNABLE, simulationLauncher.getState());
        Assert.assertEquals(Thread.State.NEW, simulationLauncher.getPythonLauncher().getState());
        try {
            TimeUnit.SECONDS.sleep(5);
            Assert.assertEquals(Thread.State.TIMED_WAITING, simulationLauncher.getState());
            Assert.assertEquals(Thread.State.WAITING, simulationLauncher.getPythonLauncher().getState());
            Assert.assertEquals(true, simulationLauncher.getProcess().isAlive());
            Assert.assertEquals(true, simulationLauncher.getPythonLauncher().getProcess().isAlive());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        simulationLauncher.des();
        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Assert.assertEquals(Thread.State.TERMINATED, simulationLauncher.getState());
        Assert.assertEquals(Thread.State.TERMINATED, simulationLauncher.getPythonLauncher().getState());
        Assert.assertEquals(false, simulationLauncher.getProcess().isAlive());
        Assert.assertEquals(false, simulationLauncher.getPythonLauncher().getProcess().isAlive());
    }
}

<template>
  <v-row class="mb-4 px-16">
    <!-- page title -->
    <v-col cols="12" class="px-16 mb-4 d-flex">
      <h1 class="page-title px-5">
        About
        <v-icon class="ml-2">
          mdi-information
        </v-icon>
      </h1>
      <v-spacer></v-spacer>
    </v-col>
    <!-- card list -->
    <v-col cols="12" class="px-16 d-flex flex-column">
      <div>
        <h2 class="mb-4 primary--text">Project Introduction</h2>
        <p>
          Eye tracking is the process of measuring either the point of gaze
          (where the user is looking) or the motion of an eye relative to the
          head (Daniel,2004). In this project, users will watch simulations on
          the software. Combined with the functions of eye recognition and
          fixation point positioning, the researcher analyzes the user's eye
          movement trajectory and derives relevant information to obtain the
          different concerns of users for different simulations.
        </p>
        <p @click="$electron.shell.openExternal('https://github.com/UNNC2018Team11/eye-tracking-for-simulation-assessment.git')">
          <strong>Github Repo</strong> : <a href="">https://github.com/UNNC2018Team11/eye-tracking-for-simulation-assessment.git</a>
        </p>
        <p @click="$electron.shell.openExternal('https://18757670961.github.io/')">
          <strong>Blog</strong> : <a href="">https://18757670961.github.io/</a>
        </p>
      </div>
      <v-divider light class="mb-8"></v-divider>
      <div>
        <h2 class="mb-4 primary--text">Developers Profile &amp; Credits</h2>
        <p><h3>| Sijin Wang (Eye Tracking)</h3></p>
        <ul class="mb-8">
          <li>
            <p>
              <em>Email</em>:
              <a href="mailto://scysw1@nottingham.edu.cn"
                >scysw1@nottingham.edu.cn</a
              >
            </p>
          </li>
          <li>
            <p><em>Experience</em>:</p>
            <ul>
              <li>
                <p>RoboMaster team (Sep 2018 – Present)</p>
                <p>
                  Won the 3rd prize in national RoboMaster competition held in
                  Shenzhen in 2019
                </p>
              </li>
              <li>
                <p>Summer research (Jun 2020 - Aug 2020 Ningbo)</p>
                <p>
                  “Efficient Clustering Algorithms with Social Network
                  Applications”
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              <em>IT Skills</em>: C, Java, PHP, CSS, HTML, JavaScript, C++,
              Python
            </p>
          </li>
        </ul>
        <p><h3>| Mingchen Liu (Eye Tracking)</h3></p>
        <ul class="mb-8">
          <li>
            <p>
              <em>Email</em>:
              <a href="mailto://scyml1@nottingham.edu.cn"
                >scyml1@nottingham.edu.cn</a
              >
            </p>
          </li>
          <li>
            <p><em>Experience</em>:</p>
            <ul>
              <li>
                <p>
                  Big data analysis of the rationality of the railway layout in
                  Shanghai (2019-07 - 2019-08)
                </p>
                <p>Self-selection project at Aarhus University Summer School</p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              <em>IT Skills</em>: C, Java, PHP, CSS, HTML, JavaScript, Python
            </p>
          </li>
        </ul>
        <p><h3>| Chenglei You (Simulation)</h3></p>
        <ul class="mb-8">
          <li>
            <em>Email</em>:
            <a href="mailto://scycy2@nottingham.edu.cn"
              >scycy2@nottingham.edu.cn</a
            >
          </li>
          <li>
            <em>Experience</em>: Crawl some data of Chinese websites, use
            Matlibplot Module to visualize data
          </li>
          <li>
            <em>IT Skills</em>:
            <ul>
              <li>C, Java, PHP, CSS, HTML, JavaScript, Python, OpenCV, C++</li>
              <li>Springboot, Mybatis</li>
              <li>
                Crawler in Python (Requests module, BeautifulSoup, Selenium +
                Chromedriver (PhantomJS) )
              </li>
            </ul>
          </li>
        </ul>
        <p><h3>| Meitong Wang (Eye Tracking)</h3></p>
        <ul class="mb-8">
          <li>
            <em>Email</em>:
            <a href="mailto://scymw1@nottingham.edu.cn"
              >scymw1@nottingham.edu.cn</a
            >
          </li>
          <li>
            <em>Experience</em>:
            <ul>
              <li>2020 Winter Innovation Camp (Google and Black walnut Lab)</li>
              <li>2019 WiFi intelligent car based on openwrt (FarSight)</li>
              <li>2019 Pre-Sales Engineer | ChinaOly Technology | Hangzhou</li>
            </ul>
          </li>
          <li><em>IT Skills</em>: C, Java, PHP, CSS, HTML, JavaScript</li>
          <li>
            <em>Award</em>:
            <ul>
              <li>2019-10 Zhejiang Provincial Scholarship Awards</li>
              <li>
                2019-12 President’s Scholarship (University of Nottingham Ningbo
                China)
              </li>
              <li>
                2019-12 The Best Student of the Year (University of Nottingham
                Ningbo China)
              </li>
            </ul>
          </li>
        </ul>
        <p><h3>| Shuguang Lyu (Frontend)</h3></p>
        <ul class="mb-8">
          <li>
            <em>Email</em>:
            <a href="mailto://scysl4@nottingham.edu.cn"
              >scysl4@nottingham.edu.cn</a
            >
          </li>
          <li>
            <em>Experience</em>:
            <ul>
              <li>Personal blog development and maintenance</li>
              <li>
                Summer research 2020 (Sensory Management Recommendation System)
              </li>
              <li>
                Summer school held by Peking University (ACM/ICPC training
                course)
              </li>
            </ul>
          </li>
          <li>
            <em>IT Skills</em>:
            <ul>
              <li>C, Java, PHP, CSS, HTML, JavaScript</li>
              <li>
                Statistical analysis based on R, relational database design (ER,
                SQL), basic data structure and algorithms, version control
                (git), unit testing (Junit)
              </li>
              <li>
                Build tools (NPM, Webpack), framework (Bootstrap, Vue.is,
                Node.is), OS basics
              </li>
            </ul>
          </li>
        </ul>
        <p><h3>| Xiaoqing Wang (Eye Tracking)</h3></p>
        <ul class="mb-8">
          <li>
            <p>
              <em>Email</em>:
              <a href="mailto://scyxw6@nottingham.edu.cn"
                >scyxw6@nottingham.edu.cn</a
              >
            </p>
          </li>
          <li>
            <p><em>Experience</em>:</p>
            <ul>
              <li>
                <p>2019-07 - 2020-08</p>
                <p>
                  Studied Python programming in Peking University, and created a
                  game in Python with a piece of microbit
                </p>
              </li>
              <li>
                <p>2020-07 - 2020-08</p>
                <p>
                  Focused on a summer research, “Play with PYNQ”. Use pynq and
                  sea-7 boards to learn some knowledge of hardware
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              <em>IT Skills</em>: C, Java, PHP, CSS, HTML, JavaScript, Python,
              Matlab
            </p>
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>

<style scoped></style>

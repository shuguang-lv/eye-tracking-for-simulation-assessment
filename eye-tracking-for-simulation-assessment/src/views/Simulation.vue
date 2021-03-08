<template>
  <v-row class="mb-4">
    <v-col cols="12" class="mb-8 d-flex">
      <h1 class="page-title px-5">
        Simulation
        <v-icon class="ml-2">
          mdi-youtube
        </v-icon>
      </h1>
      <v-spacer></v-spacer>
    </v-col>
    <v-col v-for="item in simulation" :key="item.name" cols="4">
      <Card :name="item.name" :description="item.description" />
    </v-col>
  </v-row>
</template>

<script>
import Card from '../components/Card'

export default {
  components: {
    Card,
  },

  data() {
    return {
      simulation: [
        {
          name: 'Air Defense',
          description:
            'This model is about Air Defense. The bombers dropped bombs on the houses and the radars fired missiles to destroy the bombers.',
        },
        {
          name: 'Billiard Balls',
          description:
            'In this model several balls move within a 2D rectangular area. The balls elastically rebound from each other and from the area borders. Initially, the balls have random locations and velocities. The total kinetic energy and potential energy are shown on the chart. You can add/remove the gravity force directed downward and watch the changes',
        },
        {
          name: 'Cargo Unload',
          description:
            'This model is about a crane unload cargos from one train',
        },
        {
          name: 'City Square',
          description:
            'Cars, buses and trucks are coming from 5 directions to the square with signalized and unsignalized interactions at constant rates. Vehicles cross intersections and change lanes according to traffic laws',
        },
        {
          name: 'Covid-19',
          description:
            'The model is about the prediction of Wu Han Covid-19 spread without government intervention. In this model, we suppose the population of Wu Han is about 9,000,000',
        },
        {
          name: 'Gas Station',
          description:
            'A simple model of a gas station with four dispensers and three fuel types. Features interaction of the Fluid Library and the Process Modeling Library and dynamic reconfiguration of the fuel flow network.',
        },
        {
          name: 'Maze',
          description:
            'This model shows an agent find the correct way to go out the maze automatically. You can have a competition with the agent to see who is faster.',
        },
        {
          name: 'Terrorist Attack On A City Square',
          description:
            'In this model Agent Based approach is used in combination with Discrete Event Modeling. The movement of the pedestrians is modeled with AnyLogic Pedestrian Library flowchart and the Terrorist is an agent. The communication of the two model components is done through space, which they share.',
        },
        {
          name: 'Three Body Problem',
          description:
            "In this model three objects (e.g. stars or planets) are moving in space in accordance with Newton's law. We idealize the objects as material points. The example is based on the work of Dr.Richard Montgomery who discovered the possibility of existence of stable systems like that and has obtained the parameters and the initial conditions.",
        },
      ],
    }
  },

  methods: {},
}
</script>

<style scoped></style>

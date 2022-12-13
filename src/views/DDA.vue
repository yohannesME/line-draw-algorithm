<template>
  <NavBarVue :isDDA="true"></NavBarVue>
  <div class="container">
    <h1>The DDA Line Drawing Algorithm</h1>
    <div class="coordinates">
      <div class="cord">X1<input type="number" v-model="x1" /></div>
      <div class="cord">Y1<input type="number" v-model="y1" /></div>
      <div class="cord">X2<input type="number" v-model="x2" /></div>
      <div class="cord">Y2<input type="number" v-model="y2" /></div>
    </div>
    <div class="flex">
      <button @click="generateGrid">Calculate</button>
      <span :class="{ lightup: isSlope, word: true }" @click="isSlope = true"
        >Slope</span
      >
      <span :class="{ lightup: !isSlope, word: true }" @click="isSlope = false"
        >DDA</span
      >
    </div>

    <div class="grid-container">
      <div class="flex-y" v-for="y in grid">
        <div :class="{ 'flex-x': true, marked: x }" v-for="x in y"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarVue from "../components/NavBar.vue";

export default {
  components: { NavBarVue },
  data() {
    return {
      x1: 1,
      y1: 1,
      x2: 5,
      y2: 1,
      grid: null,
      isSlope: true,
    };
  },
  methods: {
    async drawGrid(step, xinc, yinc) {
      window.setTimeout(() => {}, 0);
      let tempx = this.x1;
      let tempy = this.y1;
      for (let i = 0; i < step + 1; i++) {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        }).then(
          console.log(step, Math.round(tempy), Math.round(tempx), yinc, xinc),
          (this.grid[Math.round(tempy)][Math.round(tempx)] = true)
        );
        tempx += xinc;
        tempy += yinc;
      }
    },

    generateGrid() {
      let largex = this.y1 > this.y2 ? this.y1 : this.y2;
      largex += 1;
      this.grid = new Array(largex);

      let largey = this.x1 > this.x2 ? this.x1 : this.x2;
      largey += 1;
      for (let i = 0; i < largex; i++) {
        this.grid[i] = new Array(largey);
      }
      let dx = this.x2 - this.x1;
      let dy = this.y2 - this.y1;

      let step = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
      let slope = dy / dx;
      let yinc = 0;
      let xinc = 0;
      if (!this.isSlope) {
        yinc = dy / step;
        xinc = dx / step;
      } else {
        if (Math.abs(slope) > 1) {
          xinc = 1 / slope;
          yinc = 1;
        } else {
          xinc = 1;
          yinc = slope;
        }
      }

      this.drawGrid(step, xinc, yinc);
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.word {
  font-size: large;
  cursor: pointer;
}

.lightup {
  color: blueviolet;
}
.coordinates {
  display: flex;

  gap: 1rem;
  border-color: red;
}
.coordinates > * {
  flex: 1 1 33%;
  flex-wrap: wrap;
}
.grid-container {
  display: inline-block;
}
.flex-x {
  width: 2rem;
  height: 2rem;
  background-color: white;
  border-color: red;
}
.flex-y {
  display: flex;
  margin: 0.2rem;
  gap: 0.2rem;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.cord {
  display: flex;
  flex-direction: column;
}
.marked {
  background-color: blueviolet;
}
</style>

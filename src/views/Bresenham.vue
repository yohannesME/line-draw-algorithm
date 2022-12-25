<template>
  <div class="container">
    <h1>Bresenham Drawing Algorithm</h1>
    <div class="coordinates">
      <div class="cord">X1<input type="number" v-model="x1" /></div>
      <div class="cord">Y1<input type="number" v-model="y1" /></div>
      <div class="cord">X2<input type="number" v-model="x2" /></div>
      <div class="cord">Y2<input type="number" v-model="y2" /></div>
    </div>
    <button @click="generateGrid">Calculate</button>

    <div class="grid-container">
      <div class="flex-y" v-for="y in grid">
        <div :class="{ 'flex-x': true, marked: x }" v-for="x in y"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bresenham",
  data() {
    return {
      x1: 9,
      y1: 18,
      x: null,
      y: null,
      x2: 14,
      y2: 22,
      grid: null,
      changeX: null,
      changeY: null,
      pk: null,
    };
  },
  methods: {
    // A recursive function that is supposed to draw a line from (x1, y1) to (x2, y2) using the
    // Bresenham algorithm.
    bresenham() {
      if (this.x == this.x2 && this.y2 == this.y) {
        this.grid[this.y][this.x] = true;
        return;
      }
      console.log(this.grid, this.changeX, this.x, this.y, this.pk);
      if (this.pk < 0) {
        this.pk += 2 * this.changeY;
        this.grid[this.y][this.x] = true;
        this.x += 1;
      } else {
        this.pk += 2 * this.changeY - 2 * this.changeX;
        this.grid[this.y][this.x] = true;
        this.x += 1;
        this.y += 1;
      }
      this.bresenham();
    },
    // Creating a grid of the size of the largest x and y coordinates.
    generateGrid() {
      this.changeX = this.x2 - this.x1;
      this.changeY = this.y2 - this.y1;
      this.x = this.x1;
      this.y = this.y1;
      this.pk = 2 * this.changeY - this.changeX;
      let largex = this.y1 > this.y2 ? this.y1 : this.y2;
      largex += 1;
      this.grid = new Array(largex);

      let largey = this.x1 > this.x2 ? this.x1 : this.x2;
      largey += 1;
      for (let i = 0; i < largex; i++) {
        this.grid[i] = new Array(largey);
      }
      this.bresenham();
    },
  },
};
</script>

<style scoped></style>

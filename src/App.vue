<template>
  <div class="main car-register-form">
    <md-toolbar class="md-primary">
      <h3 class="md-title">Araç Ekleme Formu</h3>
      <br />
    </md-toolbar>
    <div class="input-area">
      <md-field>
        <label>Plaka</label>
        <md-input required v-model="plate"></md-input>
        <span class="md-error">There is an error</span>
      </md-field>
      <md-field>
        <label>Renk</label>
        <md-input required v-model="color"></md-input>
        <span class="md-error">There is an error</span>
      </md-field>
      <md-field>
        <label>Marka</label>
        <md-input
          required
          v-model="brand"
          v-on:keyup.enter="
            addCar();
            clearData();
          "
        ></md-input>
        <span class="md-error">There is an error</span>
      </md-field>
      <md-button
        class="md-raised md-primary"
        @click="
          addCar();
          clearData();
        "
        >ARACI KAYIT ET</md-button
      >
    </div>
    <br /><br /><br />
    <md-toolbar class="md-primary">
      <h3 class="md-title">Araç Listesi</h3>
      <br />
    </md-toolbar>
 <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>A KATI</th>
            <th>B KATI</th>
            <th>C KATI</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(car, id) in otopark[0]" :key="id">
            <th scope="row">{{ car.id }}</th>

            <td>{{ car.plate }} ({{ car.color }} - {{ car.brand }})</td>
          </tr>

          <tr v-for="(car) in otopark[1]" :key="car.id">

            <td>{{ car.plate }} ({{ car.color }} - {{ car.brand }})</td>
          </tr>

          <tr v-for="(car, id) in otopark[2]" :key="id">
            <th scope="row">{{ car.id }}</th>

            <td>{{ car.plate }} ({{ car.color }} - {{ car.brand }})</td>
          </tr>
        </tbody>
      </table>
    <br /><br /><br />
    <div class="md-layout-item">
      <md-toolbar class="md-primary">
        <h3 class="md-title">Araç Silme Formu</h3> </md-toolbar
      ><br />
      <md-field>
        <label for="font">Select the car to delete</label>
        <md-select v-model="selected" name="font" id="font">
          <md-option
            v-for="(car, id) in otopark[0]" :key="id"
            >{{ car.plate }}</md-option
          >
        
        </md-select>
      </md-field>
      <md-button class="md-raised md-accent"
        >ARACI LİSTEDEN ÇIKAR</md-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selected: {},
      plate: "",
      brand: "",
      color: "",
      cars: [], 
      otopark: {
        0: [],
        1: [],
        2: [],
      },
      floor: {
        a: [],
        b: [],
        c: [],
      },
      carCount: 0,
      deletedCarId: 0,
    };
  },
  methods: {
    selectId(e) {
      this.deletedCarId = e.target.value;
    },

    deleteCarById() {
      if (this.carCount <= 5) {
        console.log(this.deletedCarId);
        this.floor.a = this.floor.a.splice(parseInt(this.deletedCarId), 1);
        console.log(typeof this.deletedCarId);
        // console.log(this.selected)
      } else if (this.carCount > 5 && this.carCount <= 10) {
        this.floor.b = this.floor.b.filter(
          (car) => car.id != this.deletedCarId
        );
        console.log(this.floor.b);
      } else if (this.carCount > 15) {
        this.floor.c = this.floor.c.filter(
          (car) => car.id != this.deletedCarId
        );
        console.log(this.floor.c);
      }
    },

    addCar() {
      if (this.plate && this.brand && this.color) {
        this.carCount++;

        if (this.carCount <= 5) {
          this.otopark[0].push({
            id: this.carCount,
            plate: this.plate,
            brand: this.brand,
            color: this.color,
          });
        } else if (this.carCount > 5 && this.carCount <= 10) {
          this.otopark[1].push({
            id: this.carCount,
            plate: this.plate,
            brand: this.brand,
            color: this.color,
          });
        } else if (this.carCount > 10 && this.carCount <= 15) {
          this.otopark[2].push({
            id: this.carCount,
            plate: this.plate,
            brand: this.brand,
            color: this.color,
          });

        } else {
          alert("OTOPARK DOLU");
        }
      } else {
        alert("Inputlar bos birakilamaz!");
      }
          console.log(this.otopark)

    },

    clearData() {
      this.color = ""
      this.plate = ""
      this.brand = ""
    },
    
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.car-register-form {
  display: flexbox;
  justify-content: center;
  align-items: center;
  align-items: flex-start;
  margin: 70px;
}

.md-ripple {
  margin-right: 100px;
}


.car-table {
  display: flex;
  justify-content: center;
}
</style>
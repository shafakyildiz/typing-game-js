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
      <br /> </md-toolbar
    ><br />

    <!-- DIVS -->
    <div class="container grid">
      <div class="column">
        <strong>ID</strong>

        <ul>
          <li v-for="index in floorlimit" :key="index">{{ index }}</li>
        </ul>
      </div>

      <div class="column" v-for="f in capacity / floorlimit" :key="'A' + f">
        <strong>{{ floornames[f - 1] }} KATI</strong>

        <ul>
          <li v-for="(k, index) in floorlimit" :key="index">
            {{ otopark[f - 1][index].plate }} ({{
              otopark[f - 1][index].color
            }}
            - {{ otopark[f - 1][index].brand }})
          </li>
        </ul>

        <div class="row"></div>
      </div>
    </div>


    // CAR DELETION FORM
    <br /><br /><br />
    <div class="md-layout-item">
      <md-toolbar class="md-primary">
        <h3 class="md-title">Araç Silme Formu</h3> </md-toolbar
      ><br />
      <md-field>
        <md-select v-model="selected">
          <md-option disabled value="">Select the car to delete</md-option>
          <md-option :value="k" v-for="k in capacity" :key="k"
            >{{
              otopark[Math.floor(carCount / floorlimit)][(k - 1) % floorlimit]
                .plate
            }}
            ({{
              otopark[Math.floor(carCount / floorlimit)][(k - 1) % floorlimit]
                .color
            }}
            -
            {{
              otopark[Math.floor(carCount / floorlimit)][(k - 1) % floorlimit]
                .brand
            }})</md-option
          >
        </md-select>
      </md-field>

      <md-button class="md-raised md-accent" @click="deleteCar"
        >ARACI LİSTEDEN ÇIKAR
      </md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      capacity: 15,
      floorlimit: 5,
      floornames: "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
      floors: this.capacity / this.floorlimit,
      selected: "",
      plate: "",
      brand: "",
      color: "",
      cars: [],
      otopark: [],
      carCount: 0,
      deletedCarId: 0,
    };
  },
  methods: {
    first: function () {
      let floors = Math.ceil(this.capacity / this.floorlimit);
      console.log("Number of capacity:", this.capacity);
      console.log("Number of floor limit:", this.floorlimit);
      console.log("Number of floors:", floors);
      for (let i = 0; i < floors; i++) {
        this.otopark.push([]);
        for (let j = 0; j < this.floorlimit; j++) {
          this.otopark[i].push({
            id: this.carCount,
            plate: this.plate,
            brand: this.brand,
            color: this.color,
          });
        }
      }
      console.log("Otopark:", this.otopark);
    },

    addCar() {
      if (this.carCount < this.capacity) {
        console.log("The plate is: ", this.plate);
        console.log("The color is: ", this.color);
        console.log("The brand is: ", this.brand);

        if (this.plate && this.color && this.brand) {
          console.log(
            this.otopark[Math.floor(this.carCount / this.floorlimit)][
              this.carCount % this.floorlimit
            ]
          );

          this.otopark[Math.floor(this.carCount / this.floorlimit)][
            this.carCount % this.floorlimit
          ] = {
            id: this.carCount,
            plate: this.plate,
            brand: this.brand,
            color: this.color,
          };

          this.carCount++;
        } else {
          alert("INPUTLAR BOŞ BIRAKILAMAZ!");
        }
      } else {
        alert("OTOPARK DOLU!");
      }
      console.log("The car count is: ", this.carCount);
      console.log("Otopark:", this.otopark);
    },

    clearData() {
      this.color = "";
      this.plate = "";
      this.brand = "";
    },
    deleteCar() {
      console.log(this.selected);
      // months.splice(4, 1, 'May');
      (this.otopark[Math.floor(this.carCount / this.floorlimit)][
        (this.selected - 1) % this.floorlimit
      ].plate = ""),
        (this.otopark[Math.floor(this.carCount / this.floorlimit)][
          (this.selected - 1) % this.floorlimit
        ].color = ""),
        (this.otopark[Math.floor(this.carCount / this.floorlimit)][
          (this.selected - 1) % this.floorlimit
        ].brand = "");
      console.log("After deletion the otopark is: ", this.otopark);
    },
  },
  beforeMount() {
    this.first();
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
* {
  box-sizing: border-box;
}
/* Create a two-column layout */
.column {
  float: left;
  width: 25%;
  border: #2c3e50 5px solid;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ul {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}
/* Clearfix (clear floats) */
.row::after {
  content: "";
  clear: both;
  display: table;
}

li {
  border: aquamarine 5px solid;
  padding: 5px;
}
</style>

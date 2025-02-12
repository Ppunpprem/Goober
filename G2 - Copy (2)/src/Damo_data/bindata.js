function Bin_data(
  Building,
  Floor,
  Features_general_waste,
  Features_recycle_waste,
  Features_organic_waste,
  Features_hazardous_waste
) {
  this.building_name = Building;
  this.floor_number = Floor;
  this.general_waste = Features_general_waste;
  this.recycle_waste = Features_recycle_waste;
  this.organic_waste = Features_organic_waste;
  this.hazardous_waste = Features_hazardous_waste;
}

export const First_test_building = new Bin_data(
  "HM",
  7,
  true,
  false,
  false,
  false
);
export const Second_test_building = new Bin_data(
  "ECC",
  6,
  false,
  true,
  false,
  false
);
// export const First_comment = new Comments("The bin is dirty");
// export const First_comment = "The bin is disgusting";
// export const Second_comment = "The bin is supper clean";

export const commnents = [{
    text: "The bin is disgusting",
    profile: "https://www.w3schools.com/w3images/avatar2.png"
  },
  {
    text: "The bin is super clean",
    profile: "https://www.w3schools.com/w3images/avatar2.png"
  },
];

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById(
//     "demo"
//   ).innerHTML = `Building: ${First_test_building.building_name}, Floor: ${First_test_building.floor_number}`;
//   `Building: ${Second_test_building.building_name}, Floor: ${Second_test_building.floor_number}`;
//   `Comment: ${First_comment}`;
//   `Comment: ${Second_comment}`;
// });

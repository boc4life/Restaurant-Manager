// Get all the values from the form
function getAddProductValues() {
    let obj = {
        type  : $("#product-type").val(),
        model : $("#product-model").val(),
        size  : $("#product-size").val(),
        width : $("#product-width").val(),
        location: { aisle   : $("#location-select-0").val(),
                    section : $("#location-select-1").val(),
                    shelf   : $("#location-select-2").val(),
                    position: $("#location-select-3").val(),
                    count   : $("#product-count").val()
        }
    };
    return obj;
}

// Validate the values in the form
function validateAddProductValues() {
    let obj = getAddProductValues();

    // Disable this (until we've checked everything)
    $("#add-product-submit").attr('disabled', true);

    // Check all values:
    if (!obj.type) return null;
    if (!obj.model) return null;
    if (!obj.size) return null;
    if (!obj.width) return null;
    if (!obj.location.count) return null;
    if (!obj.location.aisle) return null;
    if (!obj.location.section) return null;
    if (!obj.location.shelf) return null;
    if (!obj.location.position) return null;
    if (!obj.location.count) return null;

    // Everything's good
    $("#add-product-submit").attr('disabled', false);
    return obj;
}

// Determine what locations are available for a new product
// This is done one location param at a time,
// based on already selected params
function addLocationSelections() {
    let props = ['aisle', 'section', 'shelf', 'position'];
    // Find the rightmost selection that is not disabled
    // Get the possible values for this selection
    // based on the values of the selections to the left
    let params = "";
    for (let i = 0; i <= 3; i++) {
        let id = "#location-select-" + i;
        let nextId = "#location-select-" + (i+1);
        if ((i === 3) || $(nextId).attr('disabled')) {
            if ($(id).val() !== "")
                return;  // Already has a value selected

            $.get("/api/" + props[i] + params, function(results) {
                for (let j = 0; j < results.length; j++) {
                    $(id).append($("<option>").text(results[j][props[i]]));
                }
                return;
            });
            return;
        } else {
            params += "/" + $(id).val();
        }
    }
}

if (sessionStorage.getItem("Name") === null) {
    window.location.replace("/");
    }
// DOCUMENT READY
$(document).ready(function() {
  console.log("doc ready")
    console.log("checked")
    
    // productsContainer holds all of our products
    var productsTable = $("#productTable");
    $(document).on("click",".delete-button", function(){
      console.log($(this))
      $.ajax({
        url: '/api/product/'+$(this).data("id"),
        type: 'DELETE',
        success: function(result) {
          window.location.href="/products";
        }
      });
    });
    //   $.delete("/api/product/"+$(this).data("id"),function(){
    //     window.location.href="/products";
    //   })
    // }))
    
    
  
    // This function grabs posts from the database and updates the view
    function getProducts(products) {
      console.log("get products")
      $.get("/api/products", function(data) {
        console.log("Products", data);
        products = data;
        if (!products || !products.length) {
          displayEmpty();
        }
        else {
          initializeRows(products);
        }
      });
    }
    


  // InitializeRows handles appending all of our constructed post HTML inside
  // productsContainer
  function initializeRows(products) {
    productsTable.empty();
    var productsToAdd = [];
    for (var i = 0; i < products.length; i++) {
      productsToAdd.push(createNewRow(products[i]));
    }
    productsTable.append(productsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(products) {
    
    var loc = products.Locations[0];
    var aisle = loc.aisle;
    var section = loc.section;
    var shelf = loc.shelf;
    var position = loc.position;
    var count = loc.count
    var tr = $("<tr scope='row'>");
    var tdtype = $("<td class='type'>")
    var tdbutton = $("<td>")
    var button = $("<button class='btn btn-sm delete-button'>")
    var tdmodel = $("<td class='model'>")
    var tdsize = $("<td class='size'>")
    var tdwidth = $("<td class='width'>")
    var tdquantity = $("<td class='count'>")
    var tdlocation = $("<td class='location'>")
    tdtype.text(products.type);
    tdmodel.text(products.model);
    tdsize.text(products.size);
    tdwidth.text(products.width);
    tdquantity.text(count)
    tdlocation.text(aisle+"."+section+"."+shelf+"."+position)
    button.text("Delete");
    button.data("id",products.id);
    tdbutton.append(button)
    tr.append(tdtype);
    tr.append(tdmodel);
    tr.append(tdsize);
    tr.append(tdwidth);
    tr.append(tdquantity);
    tr.append(tdlocation);
    tr.append(tdbutton);
    return tr;

  }
  getProducts();

  // ====================
  // Add Product MODAL JS
  // ====================
  addLocationSelections();

  // Add Product functions
  $("#add-product-submit").on("click", function(event) {
      // event.preventDefault();
      obj = validateAddProductValues();
      $.post("/api/product", obj, function(data, status) {
          console.log("Added product, status = " + status);
      });
  });

  $(".location-select").on("change", function() {
      let thisId = $(this).attr("id");
      let selIndex = parseInt(thisId.slice(-1));

      // Location params must be selected from left to right
      // When one is selected, only next to right is then enabled
      // (And all of them to the right must be unselected.)
      for (let i = selIndex+1; i <= 3; i++) {
          let nextId = "#location-select-" + i;
          $(nextId).val("");  // unselect it
          $(nextId).attr('disabled', true); // disable it
          $(nextId).empty();  // empty all options
          $(nextId).append($("<option>").text(""));
      }
      if (selIndex < 3) {
          // Enable next one to the right
          let nextId = "#location-select-" + (selIndex + 1);
          $(nextId).attr('disabled', false);
      }
      addLocationSelections();
      validateAddProductValues();
  });

  $("#add-product-form").on("keyup", function(event) {
      validateAddProductValues();
  });

  $(`#logoutButton`).on("click", function(event) {
      sessionStorage.clear();
  })

});
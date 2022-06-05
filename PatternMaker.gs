function PatternMaker() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var rangeData = sheet.getDataRange();
  var lastColumn = rangeData.getLastColumn();
  var lastRow = rangeData.getLastRow();

  //CLEARING ALL CELLS WITHIN RANGE
  for (i = 2; i <= lastRow; i++) {
    for (j = 2; j <= lastColumn; j++) {
      sheet.getRange(i, j, 1, 1).setBorder(null, null, false, false, false, false);
      sheet.getRange(i, j, 1, 1).setBackground("white");
    }
  }

  var rowInput = sheet.getRange(2, 1, lastRow-1, 1).getValues();
  var columnInput = sheet.getRange(1, 2, 1, lastColumn-1).getValues();

  var color_zero = "#2822e3";
  var color_one = "#e3c022";
  var curr = 0;
  var alt = 1;

  var color_values = new Array(lastRow);
  for (i = 0; i < color_values.length; i++) {
    color_values[i] = new Array(lastColumn);
  }
  color_values[0][0] = curr;

  var current_cell;
  
  //DASHES
  for (i = 2; i < lastRow + 1; i++){
    for (j = 2; j < lastColumn + 1; j++) {
      if (curr == 0 && color_values[i-2][j-2] == 1) {
        curr = 1;
        alt = 0;
      }
      else if (curr == 1 && color_values[i-2][j-2] == 0) {
        curr = 0;
        alt = 1;
      }

      current_cell = sheet.getRange(i, j);

      if (rowInput[i-2] == 0) { //HORIZONTAL 0 DASHES
        if (j % 2 == 1) {
          current_cell.setBorder(null, null, true, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
          color_values[i-1][j-2] = alt;
        }
        else {
          color_values[i-1][j-2] = curr;
        }
      }

      else if (rowInput[i-2] == 1) { //HORIZONTAL 1 DASHES
        if (j % 2 == 0) {
          current_cell.setBorder(null, null, true, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
          color_values[i-1][j-2] = alt;
        }
        else {
          color_values[i-1][j-2] = curr;
        }
      }

      if (columnInput[0][j-2] == 0) { //VERTICAL 0 DASHES
        if (i % 2 == 1) {
          current_cell.setBorder(null, null, null, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
          color_values[i-2][j-1] = alt;
        }
        else {
          color_values[i-2][j-1] = curr;
        }
      }

      else if (columnInput[0][j-2] == 1) { //VERTICAL 1 DASHES
        if (i % 2 == 0) {
          current_cell.setBorder(null, null, null, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
          color_values[i-2][j-1] = alt;
        }
        else {
          color_values[i-2][j-1] = curr;
        }
      }
    }
  }

  //COLORING
  for (i = 2; i < lastRow + 1; i++) {
    for (j = 2; j < lastColumn + 1; j++) {
      if (color_values[i-2][j-2] == 0) {
        sheet.getRange(i, j).setBackground(color_zero);
      }
      else {
        sheet.getRange(i, j).setBackground(color_one);
      }
    }
  }
}

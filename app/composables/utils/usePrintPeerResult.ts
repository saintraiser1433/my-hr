import { jsPDF } from "jspdf";
import autoTable, { type CellInput } from 'jspdf-autotable';
import "~/assets/fonts/oldenglishtextmt-bold.js";
import "~/assets/fonts/tahoma-normal.js";
import "~/assets/fonts/tahoma-bold.js";
import seait from "/logo/seait.png";
export const usePrintPeerResult = () => {
  const doc = new jsPDF({
    unit: "px",
    orientation: "p",
    format: "legal",
  });



  const leftMargin = 20;
  const rightMargin = doc.internal.pageSize.width - 40;
  const centerX = doc.internal.pageSize.width / 2;
  const contentWidth = rightMargin - leftMargin;
  const fullWidth = doc.internal.pageSize.width;
  // Header Section

  //initial page
  doc.addImage(seait, "PNG", 50, 18, 40, 40);
  doc.setFont("oldenglishtextmt", "bold").setFontSize(16).setTextColor(0, 100, 0);
  doc.text("South East Asian Institute of Technology, Inc.", centerX, 30, { align: "center" });
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8).setTextColor(0, 100, 0);
  doc.text("National Highway, Barangay Crossing Rubber, Tupi, South Cotabato", 225, 40, { align: "center" });
  doc.text("Tel No. (083) 226-1202   EMAIL ADDRESS: seaitinc@yahoo.com", 218, 50, { align: "center" });
  doc.setDrawColor(0, 100, 0); // RGB Green

  doc.line(0, 60, fullWidth, 60);
  doc.setDrawColor(0, 0, 0); // RGB Green

  //end header
  doc.setFontSize(12).setFont("Helvetica", "bold").setTextColor(0, 0, 0);

  doc.text("PEER TO PEER EVALUATION FORM", centerX, 90, { align: "center" });
  doc.text("(INSTRUCTORS)", centerX, 100, { align: "center" });

  doc.setFontSize(10).setFont("Helvetica", "normal").setTextColor(0, 0, 0);
  doc.text(
    "The principal purpose of peer-to-peer teacher evaluation is to encourage staff development, to strengthen teaching effectiveness, and to improve overall performance. Specifically, the objectives of the performance evaluation are:",
    leftMargin + 10, 120, { maxWidth: contentWidth - 20, align: "justify" }
  );

  doc.text(
    "1. To increase the effectiveness of each instructor and overall department success in meeting the Institution’s strategic goals;",
    leftMargin + 20, 150, { maxWidth: contentWidth - 40, align: "justify" }
  );
  doc.text(
    "2. To increase awareness of the instructor’s professional strengths and weaknesses; and",
    leftMargin + 20, 170, { maxWidth: contentWidth - 40, align: "justify" }
  );
  doc.text(
    "3. To identify opportunities for personal and professional growth.",
    leftMargin + 20, 180, { maxWidth: contentWidth - 40, align: "justify" }
  );

  doc.text(
    "For each question, please indicate your rating with an X and fill in the comment section below.",
    leftMargin + 20, 195, { maxWidth: contentWidth - 40, align: "justify" }
  );
  doc.text(
    "The following is the criteria to evaluate various qualities of the College Instructors.",
    leftMargin + 20, 210, { maxWidth: contentWidth - 40, align: "justify" }
  );


  const columnsRating = ['Rating', 'Description'];

  // Table rows
  const rowsRating = [
    ["Excellent", "The instructor modeled the criterion at a level which exceeds the standards. He/She demonstrates most of the descriptors consistently, accurately, and efficiently."],
    ["Good", "The instructor modeled the criterion at a level which exceeds the standards. He/She demonstrates most of the descriptors consistently and without significant error."],
    ["Fair", "The instructor modeled the criterion at a level which indicates improvement performance is necessary to meet standards. He/She demonstrates many of the descriptors with minimal precision and/or the application of many of the descriptors reflects some inconsistency or error."],
    ["Needs Improvement", "The instructor modeled the criterion at a level which fails to meet standards. He/She often fails to demonstrate most of the descriptors and/or the application of most of the descriptors often reflects significant error."]
  ];

  // Add title
  let firstTableFinalY = 220; // Default start position
  // Add autoTable
  autoTable(doc, {
    head: [columnsRating], // Table headers
    body: rowsRating, // Table rows
    startY: 220, // Position of the table
    styles: {
      fontSize: 8, // Change this to your desired font size
      font: 'Helvetica',
      lineWidth: 0.5, // Border thickness
      lineColor: [0, 0, 0], // Black border color
    },
    tableLineColor: [0, 0, 0], // Border color for the whole table
    tableLineWidth: 0.5,
    columnStyles: {
      0: { cellWidth: 150 }, // Wider first column for text wrapping

    },
    didDrawPage: (data) => {
      // Update the final Y position after drawing
      if (data.cursor) {
        firstTableFinalY = data.cursor.y;
      }
    },
    headStyles: {
      fontSize: 8, // Font size for headers
      fillColor: [22, 160, 133], // Custom header background color
      textColor: [255, 255, 255] // White text colors
    },
    bodyStyles: {
      fontSize: 8, // Font size for table rows
    },
    margin: { bottom: 10 } // Add some space between tables

  });



//2nd column
  doc.setFont("Helvetica", "bold").setFontSize(8);
  const columns = ['Function/Specific Tasks', '1-Fail', '2-Poor', '3-Satisfactory', '4-Very Satisfactory', '5-Outstanding'];

  // Table rows
  const rows = [
    ["Can you tell me about the important people in your life?", '/'],
    ["What have been some of the happiest moments in your life? The saddest?"],
    ["Who has been the biggest influence on your life? What lessons did that person or those people teach you?"],
  ];
  
const head: (string[] | { [key: string]: any })[] = [
  [{ 
    content: 'CORE BEHAVORIAL COMPETENCIES', 
    colSpan: columns.length, 
    styles: { 
      halign: 'center', 
      fillColor: [22, 160, 133] as [number, number, number], 
      textColor: [255, 255, 255] as [number, number, number], 
      fontStyle: 'bold' as const 
    } 
  }],
  columns // Regular column headers
];

let secondTableFinalY = firstTableFinalY + 10;
autoTable(doc, {
  head: head,
  body: rows,
  startY: firstTableFinalY + 10, 
  styles: {
    fontSize: 8,
    font: 'Helvetica',
    lineWidth: 0.5,
    lineColor: [0, 0, 0],
  },
  tableLineColor: [0, 0, 0],
  tableLineWidth: 0.5,
  columnStyles: {
    0: { cellWidth: 150 },
  },
  didDrawPage: (data) => {
    // Update the final Y position after drawing
    if (data.cursor) {
      secondTableFinalY = data.cursor.y;
    }
  },
  headStyles: {
    fontSize: 8,
    fillColor: [22, 160, 133], 
    textColor: [255, 255, 255], 
  },
  bodyStyles: {
    fontSize: 8,
  },
});
autoTable(doc, {
  head: [columns], // Table headers
  body: rows,
  startY: secondTableFinalY, 
  styles: {
    fontSize: 8,
    font: 'Helvetica',
    lineWidth: 0.5,
    lineColor: [0, 0, 0],
  },
  tableLineColor: [0, 0, 0],
  tableLineWidth: 0.5,
  columnStyles: {
    0: { cellWidth: 150 },
  },
  didDrawPage: (data) => {
    // Update the final Y position after drawing
    if (data.cursor) {
      secondTableFinalY = data.cursor.y;
    }
  },
  headStyles: {
    fontSize: 8,
    fillColor: [22, 160, 133], 
    textColor: [255, 255, 255], 
  },
  bodyStyles: {
    fontSize: 8,
  },
});

const headComment: CellInput[][] = [
  [{
    content: 'Comments/Recommendations',
    colSpan: 1,
    styles: {
      halign: 'left' as const,
      fillColor: [22, 160, 133] as [number, number, number],
      textColor: [255, 255, 255] as [number, number, number],
      fontStyle: 'bold' as const,
      cellPadding: 5
    }
  }]
];

// Single column with empty content (8 rows)
const commentRows: string[][] = Array(1).fill(['']);
let commentTableFinalY = secondTableFinalY 
autoTable(doc, {
  head: headComment,
  body: commentRows,
  startY: secondTableFinalY + 10,
  styles: {
    fontSize: 10,
    font: 'Helvetica' as const,
    lineWidth: 0.5,
    lineColor: [0, 0, 0] as [number, number, number],
    cellPadding: 10
  },
  tableLineColor: [0, 0, 0] as [number, number, number],
  tableLineWidth: 0.5,
  headStyles: {
    fontSize: 10,
    fillColor: [22, 160, 133] as [number, number, number],
    textColor: [255, 255, 255] as [number, number, number],
    lineWidth: 0.5
  },
  bodyStyles: {
    fontSize: 10,
    minCellHeight: 100
  },
  didDrawPage: (data) => {
    if (data.cursor) {
      commentTableFinalY = data.cursor.y;
    }
  }
});

doc.setFont("Helvetica", "normal").setFontSize(8);
doc.text("Name of Evaluatee:", leftMargin+10, commentTableFinalY + 15);
doc.line(leftMargin+100, commentTableFinalY + 18, rightMargin - 200 , commentTableFinalY + 18); // Line for numerical rating

doc.text("Designation:", leftMargin+10, commentTableFinalY + 30);
doc.line(leftMargin+100, commentTableFinalY+33, rightMargin - 200 , commentTableFinalY+33); // Line for numerical rating

doc.text("Department:", leftMargin+10, commentTableFinalY+45);
doc.line(leftMargin+100, commentTableFinalY+48, rightMargin - 200 , commentTableFinalY+48); // Line for numerical rating

doc.text("Date Taken:", leftMargin+10, commentTableFinalY+60);
doc.line(leftMargin+100, commentTableFinalY+63, rightMargin - 200 , commentTableFinalY+63); // Line for numerical rating

doc.text("Evaluator (optional):", leftMargin+10, commentTableFinalY+75);
doc.line(leftMargin+100, commentTableFinalY+78, rightMargin - 200 , commentTableFinalY+78); // Line for numerical rating













  window.open(doc.output("bloburl"));
};

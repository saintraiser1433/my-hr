import { jsPDF } from "jspdf";
import autoTable, { type CellInput, type RowInput, type Color } from 'jspdf-autotable';
import "~/assets/fonts/oldenglishtextmt-bold.js";
import "~/assets/fonts/tahoma-normal.js";
import "~/assets/fonts/tahoma-bold.js";
import seait from "/logo/seait.png";
export const usePrintPeerResult = (data: EmployeeRating[]) => {
  const doc = new jsPDF({
    unit: "px",
    orientation: "p",
    format: "legal",
  });

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const color = (r: number, g: number, b: number): Color => [r, g, b];

  // Helper function to get font style safely
  const getFontStyle = (isSelected: boolean): 'bold' | 'normal' =>
    isSelected ? 'bold' : 'normal';


  // Loop through each evaluation in the data array
  data.forEach((evaluation, index) => {
    // Add a new page for each evaluation after the first one
    if (index > 0) {
      doc.addPage();
    }



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


    const rowsRating = evaluation.template.map(template => [
      template.title,
      template.description
    ]);

    // Add title
    let firstTableFinalY = 220;
    // Add autoTable
    autoTable(doc, {
      head: [columnsRating], // Table headers
      body: rowsRating, // Table rows
      startY: 200, // Position of the table
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
    // First, properly type our category rows object

    const templateTitles = evaluation.template.map(t => `${t.title} (${t.score})`);
    const createColumns = (categoryName: string): CellInput[] => [
      { content: categoryName, styles: { fontStyle: 'bold' } }, // Use category name as header
      ...templateTitles.map(title => ({
        content: title,
        styles: {
          fontStyle: 'bold' as const,
          halign: 'center' as const
        }
      }))
    ];

    // Initialize rowsByCategory with proper typing
    const rowsByCategory: Record<string, RowInput[]> = {};

    // Group answers by category with type safety
    evaluation.answersData.forEach(answer => {
      if (!rowsByCategory[answer.category]) {
        rowsByCategory[answer.category] = [];
      }
    
      // Create a row for this question with proper typing
      const row: RowInput = [
        {
          content: answer.question,
          styles: {
            fontStyle: 'normal'
          }
        },
        ...evaluation.template.map(t => ({
          content: answer.templateDetailTitle === t.title ? 'X' : '',
          styles: {
            halign: 'center' as const,
            fontStyle: getFontStyle(answer.templateDetailTitle === t.title)
          }
        }))
      ];
    
      rowsByCategory[answer.category]?.push(row);
    });

    

    // Now create the tables for each category with proper typing
    let firstCategory = true;
    Object.entries(rowsByCategory).forEach(([category, rows]) => {
      const columns = createColumns(category); // Create columns with category name

      const head: RowInput[] = firstCategory ? [
        [{
          content: 'CORE BEHAVIORAL COMPETENCES',
          colSpan: columns.length,
          styles: {
            halign: 'center',
            fillColor: color(22, 160, 133),
            textColor: color(255, 255, 255),
            fontStyle: 'bold',
            cellPadding: 5
          }
        }],
        columns
      ] : [columns];

      autoTable(doc, {
        head: head,
        body: rows,
        startY: firstCategory && firstCategory ? firstTableFinalY + 10 : firstTableFinalY, // Only set startY for first table
        styles: {
          fontSize: 8,
          font: 'Helvetica',
          lineWidth: 0.5,
          lineColor: color(0, 0, 0),
          cellPadding: 3
        },
        tableLineColor: color(0, 0, 0),
        tableLineWidth: 0.5,
        columnStyles: {
          0: {
            cellWidth: 150,
            halign: 'left'
          },
        },
        didDrawPage: (data) => {
          if (data.cursor) {
            firstTableFinalY = data.cursor.y;
          }
        },
        headStyles: {
          fontSize: 8,
          fillColor: color(22, 160, 133),
          textColor: color(255, 255, 255),
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 8,
          halign: 'left'
        },
      });

      firstCategory = false; // Only show header for first category
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
    const commentText = evaluation.comment ? stripHtml(evaluation.comment) : '';
    const commentRows: string[][] = [[commentText]];
    autoTable(doc, {
      head: headComment,
      body: commentRows,
      startY: firstTableFinalY + 10,
      styles: {
        fontSize: 8,
        font: 'Helvetica' as const,
        lineWidth: 0.5,
        lineColor: [0, 0, 0] as [number, number, number],
        cellPadding: 10
      },
      tableLineColor: [0, 0, 0] as [number, number, number],
      tableLineWidth: 0.5,
      headStyles: {
        fontSize: 8,
        fillColor: [22, 160, 133] as [number, number, number],
        textColor: [255, 255, 255] as [number, number, number],
        lineWidth: 0.5
      },
      bodyStyles: {
        fontSize: 8,
        minCellHeight: 100
      },
      didDrawPage: (data) => {
        if (data.cursor) {
          firstTableFinalY = data.cursor.y;
        }
      }
    });

    doc.setFont("Helvetica", "normal").setFontSize(8);
    // Add evaluatee name from the data
    doc.text("Name of Evaluatee:", leftMargin + 10, firstTableFinalY + 15);
    doc.text(evaluation.name, leftMargin + 100, firstTableFinalY + 15); // Add actual name
    doc.line(leftMargin + 100, firstTableFinalY + 18, rightMargin - 200, firstTableFinalY + 18);

    doc.text("Designation:", leftMargin + 10, firstTableFinalY + 30);
    doc.text("Instructor", leftMargin + 100, firstTableFinalY + 30); // Default to "Instructor" or use actual designation if available
    doc.line(leftMargin + 100, firstTableFinalY + 33, rightMargin - 200, firstTableFinalY + 33);

    doc.text("Department:", leftMargin + 10, firstTableFinalY + 45);
    doc.text(evaluation.departmentName, leftMargin + 100, firstTableFinalY + 45); // Add department name from data
    doc.line(leftMargin + 100, firstTableFinalY + 48, rightMargin - 200, firstTableFinalY + 48);

    doc.text("Date Taken:", leftMargin + 10, firstTableFinalY + 60);
    doc.text(new Date().toLocaleDateString(), leftMargin + 100, firstTableFinalY + 60); // Add current date
    doc.line(leftMargin + 100, firstTableFinalY + 63, rightMargin - 200, firstTableFinalY + 63);

    doc.text("Evaluator (optional):", leftMargin + 10, firstTableFinalY + 75);
    doc.text(evaluation.evaluatedBy || '', leftMargin + 100, firstTableFinalY + 75); // Add evaluator name if exists
    doc.line(leftMargin + 100, firstTableFinalY + 78, rightMargin - 200, firstTableFinalY + 78);



  });








  window.open(doc.output("bloburl"));
};

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePartsPDF = ({ meta, setId, parts, pricePerBrick, totalValue }) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const PAGE_W = 210;
    const MARGIN = 14;

    doc.setFillColor(124, 58, 237);
    doc.rect(0, 0, PAGE_W, 32, 'F');

    const drawFlower = (cx, cy, r, color) => {
        const [rc, gc, bc] = color;
        for (let i = 0; i < 6; i++) {
            const angle = (i * 60 * Math.PI) / 180;
            doc.setFillColor(rc, gc, bc);
            doc.circle(cx + r * 1.5 * Math.cos(angle), cy + r * 1.5 * Math.sin(angle), r, 'F');
        }
        doc.setFillColor(251, 191, 36);
        doc.circle(cx, cy, r * 0.7, 'F');
    };

    drawFlower(PAGE_W - 18, 16, 3.5, [249, 168, 212]);
    drawFlower(18, 16, 3,   [196, 181, 253]);
    drawFlower(PAGE_W - 36, 8, 2,  [165, 243, 252]);

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('BrickLister – Parts Report', MARGIN, 14);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString('en-GB')}`, MARGIN, 22);

    doc.setTextColor(30, 27, 58);
    doc.setFillColor(245, 238, 255);
    doc.roundedRect(MARGIN, 38, PAGE_W - MARGIN * 2, 28, 4, 4, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(124, 58, 237);
    doc.text(meta.name, MARGIN + 6, 49);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(74, 63, 107);
    doc.text(`Set number: #${setId}`, MARGIN + 6, 57);
    doc.text(`Year released: ${meta.year}`, MARGIN + 60, 57);
    doc.text(`Pieces in set: ${meta.pieces}`, MARGIN + 110, 57);

    const statsY = 74;

    const stats = [
        { label: 'Rows in report',   value: `${parts.length}` },
        { label: 'Price per brick',  value: `${pricePerBrick.toFixed(2)} PLN` },
        { label: 'Total value',      value: `${totalValue.toFixed(2)} PLN` },
    ];

    stats.forEach((s, i) => {
        const x = MARGIN + i * 62;
        doc.setFillColor(236, 72, 153);
        doc.setFillColor(i === 2 ? 124 : 196, i === 2 ? 58 : 181, i === 2 ? 237 : 253);
        doc.roundedRect(x, statsY, 58, 18, 3, 3, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.text(s.value, x + 4, statsY + 8);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(220, 208, 255);
        doc.text(s.label, x + 4, statsY + 14);
    });

    const tableColumns = ['#', 'Name', 'Element ID', 'Qty', 'Value (PLN)'];
    const tableRows = parts.map((p, i) => [
        i + 1,
        p.name || '—',
        p.elementId || '—',
        p.quantity || 0,
        ((parseInt(p.quantity) || 0) * pricePerBrick).toFixed(2),
    ]);

    autoTable(doc, {
        startY: statsY + 26,
        head: [tableColumns],
        body: tableRows,
        margin: { left: MARGIN, right: MARGIN },
        styles: {
            font: 'helvetica',
            fontSize: 8.5,
            cellPadding: 3,
            textColor: [30, 27, 58],
        },
        headStyles: {
            fillColor: [124, 58, 237],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 9,
        },
        alternateRowStyles: {
            fillColor: [250, 245, 255],
        },
        columnStyles: {
            0: { halign: 'center', cellWidth: 10 },
            2: { font: 'courier', fontSize: 8 },
            3: { halign: 'center' },
            4: { halign: 'right', fontStyle: 'bold' },
        },
        didDrawPage: (data) => {
            const pageH = doc.internal.pageSize.height;
            doc.setFontSize(7.5);
            doc.setTextColor(139, 128, 168);
            doc.text(
                `BrickLister © ${new Date().getFullYear()} | Page ${data.pageNumber}`,
                PAGE_W / 2, pageH - 6,
                { align: 'center' }
            );
            drawFlower(PAGE_W - MARGIN, pageH - 8, 2, [249, 168, 212]);
        },
    });

    const finalY = doc.lastAutoTable.finalY + 6;
    doc.setFillColor(124, 58, 237);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.roundedRect(PAGE_W - MARGIN - 70, finalY, 70, 10, 2, 2, 'F');
    doc.text(`TOTAL: ${totalValue.toFixed(2)} PLN`, PAGE_W - MARGIN - 4, finalY + 7, { align: 'right' });

    doc.save(`lego-${setId}-parts.pdf`);
};


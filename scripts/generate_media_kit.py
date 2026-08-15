from fpdf import FPDF

W, H = 210, 297
RED = (227, 30, 36)
BLACK = (5, 5, 5)
GREY = (163, 163, 163)
WHITE = (255, 255, 255)

pdf = FPDF(format="A4", unit="mm")
pdf.add_page()
pdf.set_auto_page_break(False)

pdf.set_fill_color(*BLACK)
pdf.rect(0, 0, W, H, "F")
pdf.set_fill_color(*RED)
pdf.rect(0, 0, W, 5, "F")
pdf.rect(0, H - 5, W, 5, "F")

pdf.image("/app/frontend/public/logo.png", x=15, y=14, w=42)

pdf.set_xy(15, 48)
pdf.set_font("helvetica", "B", 30)
pdf.set_text_color(*WHITE)
pdf.cell(0, 12, "MEDIA KIT 2026", new_x="LMARGIN", new_y="NEXT")

pdf.set_x(15)
pdf.set_font("helvetica", "B", 12)
pdf.set_text_color(*RED)
pdf.cell(0, 8, "ADVERTISING THAT COMES HOME", new_x="LMARGIN", new_y="NEXT")

pdf.set_x(15)
pdf.set_font("helvetica", "", 10.5)
pdf.set_text_color(*GREY)
pdf.multi_cell(175, 6, "Premium Digital Out-of-Home (DOOH) advertising across Delhi-NCR's most exclusive residential societies. Reach millions where they actually live.")

pdf.set_fill_color(*RED)
pdf.rect(15, 82, 60, 1.2, "F")

stats = [("30+", "SOCIETIES"), ("720", "SCREENS"), ("DELHI-NCR", "FOOTPRINT"), ("55,000+", "DAILY IMPRESSIONS")]
box_w, gap, y = 42, 4, 92
for i, (num, label) in enumerate(stats):
    x = 15 + i * (box_w + gap)
    pdf.set_draw_color(*RED)
    pdf.set_line_width(0.5)
    pdf.rect(x, y, box_w, 26)
    pdf.set_xy(x + 3, y + 4)
    pdf.set_font("helvetica", "B", 15)
    pdf.set_text_color(*WHITE)
    pdf.cell(box_w - 6, 8, num)
    pdf.set_xy(x + 3, y + 14)
    pdf.set_font("helvetica", "", 6.5)
    pdf.set_text_color(*GREY)
    pdf.cell(box_w - 6, 5, label)

pdf.set_xy(15, 132)
pdf.set_font("helvetica", "B", 14)
pdf.set_text_color(*RED)
pdf.cell(0, 8, "INVENTORY", new_x="LMARGIN", new_y="NEXT")

items = [
    ("OUTDOOR LED SCREENS", "Large-format, high-brightness screens at society perimeters and high-traffic junctions."),
    ("INDOOR LOBBY DISPLAYS", "Premium digital displays inside lobbies and clubhouses - captive, high-dwell-time audience."),
    ("ENTRY GATE UNIPOLES", "Dominant placements at society entry gates - first and last impression, every day."),
]
y = 144
for title, desc in items:
    pdf.set_xy(15, y)
    pdf.set_font("helvetica", "B", 11)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 6, title, new_x="LMARGIN", new_y="NEXT")
    pdf.set_x(15)
    pdf.set_font("helvetica", "", 9.5)
    pdf.set_text_color(*GREY)
    pdf.multi_cell(175, 5.5, desc)
    y += 20

pdf.set_xy(15, 210)
pdf.set_font("helvetica", "B", 14)
pdf.set_text_color(*RED)
pdf.cell(0, 8, "WHY DREAMING MONKS", new_x="LMARGIN", new_y="NEXT")
pdf.set_x(15)
pdf.set_font("helvetica", "", 9.5)
pdf.set_text_color(*GREY)
pdf.multi_cell(175, 6, "Hyper-local targeting  |  Premium residential audience  |  High dwell-time visibility  |  Effortless booking")

pdf.set_fill_color(*RED)
pdf.rect(15, 246, 180, 34, "F")
pdf.set_xy(20, 251)
pdf.set_font("helvetica", "B", 12)
pdf.set_text_color(*WHITE)
pdf.cell(0, 6, "GET A QUOTE", new_x="LMARGIN", new_y="NEXT")
pdf.set_x(20)
pdf.set_font("helvetica", "", 10)
pdf.cell(0, 6, "careers.dreamingmonks@gmail.com   |   +91 99681 75479", new_x="LMARGIN", new_y="NEXT")
pdf.set_x(20)
pdf.cell(0, 6, "dreamingmonks.com   |   Delhi-NCR, India", new_x="LMARGIN", new_y="NEXT")

pdf.output("/app/frontend/public/media-kit.pdf")
print("media-kit.pdf generated")

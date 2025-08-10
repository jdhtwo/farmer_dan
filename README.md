Farmer Dan is an inventory manager for greenhouses, farms, gardens, and hobbyists.

The main idea is to have the following use cases available to the planter on their mobile device. The web app will allow input or modification to any of the data. Someone working in a greenhouse or similar will be able to take out the phone in their pocket and make the necessary inputs or adjustments.

Use cases include:
-Cuttings: Per plant, log date, cell size, quantity, original tag, and notes.
-Print and read bar codes for labels.
-Planting Activity: Per plant, count number of seeds purchased, planting date, tray size, number of trays, density, notes, tag, number of seeds planted.
-Ordered Plants: receiving date, distributor, plant details.
-Seed Inventory: plant details, original count, current count, supplier.
-Transplants: upsized to trays or baskets, new counts, reason for transplant.
-Terminations: what plants are not thriving or dying?
-Notes on plants experiencing bugs, mold, etc that would cause one to not order that plant again
-General notes

All of the input data can be custom queried to inform the planter on various aspects of their operation. Future plans could include the ability for the system to make recommendations on when to plant certain species, etc.

Cursor Frontend:
Input is via React web app.

VSCode:
Thunder Client (API requests)

Backend / pipeline:
AWS API Gateway (API handler)
AWS IAM (Authentication)
AWS Lambda (code)
AWS DynamoDB (database, tables)
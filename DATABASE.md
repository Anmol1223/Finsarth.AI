# Finsarth AI Database Design
## Purpose
This document defines how data will be stored inside Finsarth AI.
Understanding this document means understanding how the entire application works.
---
# Data Flow
User
→ Accounts
→ Transactions
→ Categories
→ AI Analysis
→ Insights
Everything starts with transaction data.
---
# Table 1: Users
## Purpose
Stores user account information.
### Fields
- id
- name
- email
- password_hash
- created_at
### Example
Name: Anmol Raj
Email: anmol@example.com
---
# Table 2: Accounts
## Purpose
Stores bank accounts and credit cards connected by a user.
### Fields
- id
- user_id
- account_name
- account_type
- provider
- created_at
### Examples
Account Name:
HDFC Savings Account,
Account Type:
Savings,
Provider:
HDFC Bank
---
Account Name:
ICICI Credit Card,
Account Type:
Credit Card,
Provider:
ICICI Bank
---
# Relationship
One User
can have
Many Accounts
Example:
Anmol
→ HDFC Savings
→ ICICI Credit Card
→ Axis Savings
---
# Table 3: Transactions
## Purpose
Stores all spending and income records.
This is the most important table in the system.
### Fields
- id
- user_id
- account_id
- transaction_date
- merchant
- amount
- category
- description
- created_at
### Example
Date:
2026-09-08
Merchant:
Amazon
Amount:
1800
Category:
Shopping
Description:
Headphones Purchase
---
# Relationship
One Account
can have
Many Transactions
Example:
HDFC Savings
→ Starbucks
→ Uber
→ Amazon
→ Netflix
---
# Table 4: Categories
## Purpose
Stores available spending categories.
### Fields
- id
- category_name
- category_type
### Categories
Food & Dining
Groceries
Shopping
Travel
Transport
Healthcare
Entertainment
Subscriptions
Education
Other
---
# Relationship
One Category
can contain
Many Transactions
Example:
Food & Dining 
→ Starbucks
→ Domino's
→ McDonald's
---
# Table 5: AI Insights
## Purpose
Stores AI-generated recommendations.
### Fields
- id
- user_id
- insight_type
- insight_text
- generated_at
### Examples
Insight Type:
Savings Opportunity
Insight:
You could save approximately ₹3,500 per month by reducing restaurant spending by 15%.
---
Insight Type:
Category Trend
Insight:
Food spending increased by 18% compared to last month.
---
# Database Relationships
Users
│
├── Accounts
│
└── Transactions
│
└── Categories
│
└── AI Insights
---
# Simplified Flow
User registers
↓
User adds account
↓
Transactions imported
↓
Transactions categorized
↓
Dashboard generated
↓
AI insights generated
---
# SQL Concepts Learned
## Table
A collection of related records.
Example:
Transactions
---
## Row
One record inside a table.
Example:
Amazon | ₹1800 | Shopping
---
## Column
A property of the record.
Examples:
Amount
Merchant
Category
Date
---

## Primary Key
A unique identifier.
Example:
id
Each record has a unique id.
---
## Foreign Key
A connection between tables.
Example:
user_id
connects
Transactions
to
Users
---
# Phase 1 Database Scope
Required Tables
✅ Users
✅ Accounts
✅ Transactions
✅ Categories
✅ AI Insights
No additional tables should be created unless absolutely necessary.
Keep the database simple and focused on transaction intelligence.

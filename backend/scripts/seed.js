// PostgreSQL Seeding Script
const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' }); // load from backend/.env or parent .env
const path = require('path');

// Ensure we load env variables from the backend folder
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  process.exit(1);
}

console.log('📡 Connecting to PostgreSQL database...');
const pool = new Pool({ connectionString });

async function seed() {
  const client = await pool.connect();
  try {
    console.log('🏁 Starting Database Schema Creation & Seeding...');

    // 1. Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        full_name VARCHAR(255),
        phone VARCHAR(50),
        location VARCHAR(255),
        date_of_birth VARCHAR(50),
        age VARCHAR(10),
        position VARCHAR(100),
        jersey_number VARCHAR(10),
        height VARCHAR(20),
        weight VARCHAR(20),
        school VARCHAR(255),
        child_name VARCHAR(255),
        child_age VARCHAR(10),
        child_school VARCHAR(255),
        organization VARCHAR(255),
        scout_role VARCHAR(255),
        user_type VARCHAR(50) DEFAULT 'general',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "profiles" verified/created.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS programs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC,
        duration VARCHAR(100),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "programs" verified/created.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC NOT NULL,
        category VARCHAR(100),
        sizes TEXT[],
        image_url VARCHAR(255),
        rating NUMERIC DEFAULT 5.0,
        in_stock BOOLEAN DEFAULT true,
        description TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "products" verified/created.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES profiles(id),
        program_id INTEGER REFERENCES programs(id),
        amount NUMERIC,
        payment_method VARCHAR(100),
        transaction_code VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        payment_status VARCHAR(50) DEFAULT 'pending',
        athlete_name VARCHAR(255),
        date_of_birth VARCHAR(50),
        gender VARCHAR(20),
        school VARCHAR(255),
        grade VARCHAR(50),
        experience_level VARCHAR(100),
        jersey_size VARCHAR(20),
        medical_conditions TEXT,
        parent_name VARCHAR(255),
        relationship VARCHAR(100),
        phone VARCHAR(50),
        email VARCHAR(255),
        address TEXT,
        emergency_contact VARCHAR(255),
        program_type VARCHAR(255),
        preferred_days VARCHAR(255),
        hear_about_us VARCHAR(255),
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "registrations" verified/created.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES profiles(id),
        items JSONB NOT NULL,
        total NUMERIC NOT NULL,
        shipping_address JSONB NOT NULL,
        payment_method VARCHAR(100),
        status VARCHAR(50) DEFAULT 'pending',
        payment_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "orders" verified/created.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES profiles(id),
        order_id INTEGER REFERENCES orders(id),
        amount NUMERIC NOT NULL,
        payment_method VARCHAR(100),
        phone_number VARCHAR(50),
        transaction_code VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "payments" verified/created.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "contacts" verified/created.');

    // 2. Insert Seed Data
    // Programs
    const programCheck = await client.query('SELECT COUNT(*) FROM programs');
    if (parseInt(programCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO programs (title, description, price, duration) VALUES
        ('WEEKLY PRACTICES', 'Consistent training that builds fundamental skills, basketball IQ, and physical conditioning.', 150000, '1 Month'),
        ('HOLIDAY CAMPS', 'Intensive week-long camps during school holidays featuring special guest coaches.', 250000, '2 Weeks'),
        ('PRIVATE SESSIONS', 'One-on-one personalized training to accelerate development and target specific areas.', 80000, 'Per Session'),
        ('COMPETITIVE GAMES', 'Real-game experience against other academies and in school competitions.', 100000, 'Season Package');
      `);
      console.log('🌱 Seeded 4 training programs.');
    }

    // Products
    const productCheck = await client.query('SELECT COUNT(*) FROM products');
    if (parseInt(productCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO products (name, price, category, sizes, image_url, rating, in_stock, description) VALUES
        ('Flight 13 Home Jersey', 75000, 'Jerseys', ARRAY['S', 'M', 'L', 'XL'], '/images/placeholder.jpg', 4.8, true, 'Official Flight 13 home jersey. Made with breathable, moisture-wicking fabric.'),
        ('Flight 13 Away Jersey', 75000, 'Jerseys', ARRAY['S', 'M', 'L', 'XL'], '/images/placeholder.jpg', 4.7, true, 'Official Flight 13 away jersey. Premium performance mesh fabric.'),
        ('Training Shorts', 40000, 'Apparel', ARRAY['S', 'M', 'L', 'XL'], '/images/placeholder.jpg', 4.5, true, 'Comfortable training shorts with zip pockets and breathable lining.'),
        ('Wilson Basketball Size 7', 120000, 'Equipment', ARRAY['Size 7'], '/images/placeholder.jpg', 4.9, true, 'Wilson composite leather indoor/outdoor basketball.');
      `);
      console.log('🌱 Seeded 4 products in shop.');
    }

    // Coaches in Profiles
    const coachCheck = await client.query("SELECT COUNT(*) FROM profiles WHERE user_type = 'coach'");
    if (parseInt(coachCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO profiles (id, email, full_name, phone, location, user_type) VALUES
        ('coach-1', 'chut@flight13.com', 'Coach Chut Achol Matet', '+256780898611', 'Kampala', 'coach'),
        ('coach-2', 'mark@flight13.com', 'Coach Bamutende Mark', '+256780898612', 'Kampala', 'coach'),
        ('coach-3', 'nathan@flight13.com', 'Coach Nathan Ateng', '+256780898613', 'Kampala', 'coach');
      `);
      console.log('🌱 Seeded 3 coach profiles.');
    }

    console.log('🏁 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    client.release();
  }
}

seed().then(() => pool.end());

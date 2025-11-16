import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(process.env.DATABASE_URL);



  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      comment TEXT NOT NULL
    );
  `;


  await sql`DELETE FROM comments;`;

  await sql`
    INSERT INTO comments (comment)
    VALUES
      ('Seed: все'),
      ('Seed: наче'),
      ('Seed: працює');
  `;

  console.log('Seed виконано успішно');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Помилка seed скрипта:', err);
    process.exit(1);
  });

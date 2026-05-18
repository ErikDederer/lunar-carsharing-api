import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const DB_CONNECTION_STRING = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString: DB_CONNECTION_STRING,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !DB_CONNECTION_STRING) {
    throw new Error(
      'Please check env vars: ADMIN_EMAIL, ADMIN_PASSWORD and DATABASE_URL must be set in .env',
    );
  }
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { hashed: hashed },
    create: {
      email: ADMIN_EMAIL,
      hashed: hashed,
    },
  });
  console.log('Admin user created:', admin);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

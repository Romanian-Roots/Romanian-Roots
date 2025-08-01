import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* ------------------------------------------------------------------ */
/*  SEED DATA – 10 “FOUND” capsules around Romania                     */
/* ------------------------------------------------------------------ */
const SEED_CAPSULES = [
  {
    name: 'Capsula Bucharest 2',
    description: 'O capsulă culturală în inima capitalei.',
    latitude: 44.8768,
    longitude: 26.1925,
  },
  {
    name: 'Capsula Cluj 2',
    description: 'Descoperă spiritul vibrant al Clujului.',
    latitude: 46.1103,
    longitude: 23.2317,
  },
  {
    name: 'Capsula Iași 2',
    description: 'În cel mai vechi parc din oraș.',
    latitude: 47.2930,
    longitude: 27.7851,
  },
  
];

/* ------------------------------------------------------------------ */
/*  MAIN                                                              */
/* ------------------------------------------------------------------ */
(async () => {
  try {
    // 1️⃣  find the single admin user
    const admin = await prisma.user.findUnique({
      where: { email: 'serverA@gmail.com' },          // <<< adjust if needed
    });

    if (!admin) {
      throw new Error('Admin user not found – adjust the e-mail in the script.');
    }

    // 2️⃣  insert capsules (skip if already present)
    for (const seed of SEED_CAPSULES) {
      const already = await prisma.cultureCapsule.findFirst({
        where: { name: seed.name },
      });
      if (already) continue;

      // generate a 4-digit code and hash it
      const rawCode = String(Math.floor(1000 + Math.random() * 9000));
      const codeHash = await bcrypt.hash(rawCode, 10);

      await prisma.cultureCapsule.create({
        data: {
          ...seed,
          status: 'CLUE',         // enum value
          imageUrl: null,
          codeHash,
          userId: admin.id,
        },
      });


    }

    console.log('\n✅  10 capsules seeded.');
  } catch (err) {
    console.error('❌  Seed failed:', err);
  } finally {
    await prisma.$disconnect();
  }
})();

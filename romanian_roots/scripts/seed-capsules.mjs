import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* ------------------------------------------------------------------ */
/*  SEED DATA – 10 “FOUND” capsules around Romania                     */
/* ------------------------------------------------------------------ */
const SEED_CAPSULES = [
  {
    name: 'Capsula Bucharest – KM 0',
    description: 'O capsulă culturală în inima capitalei.',
    latitude: 44.4268,
    longitude: 26.1025,
  },
  {
    name: 'Capsula Cluj – Piața Unirii',
    description: 'Descoperă spiritul vibrant al Clujului.',
    latitude: 46.7703,
    longitude: 23.5917,
  },
  {
    name: 'Capsula Iași – Copou',
    description: 'În cel mai vechi parc din oraș.',
    latitude: 47.1830,
    longitude: 27.5751,
  },
  {
    name: 'Capsula Timișoara – Bega',
    description: 'Pe malul canalului Bega.',
    latitude: 45.7537,
    longitude: 21.2257,
  },
  {
    name: 'Capsula Brașov – Tâmpa',
    description: 'Sub literele „BRAȘOV”.',
    latitude: 45.6433,
    longitude: 25.5880,
  },
  {
    name: 'Capsula Constanța – Cazino',
    description: 'La țărmul Mării Negre.',
    latitude: 44.1760,
    longitude: 28.6611,
  },
  {
    name: 'Capsula Sibiu – Podul Minciunilor',
    description: 'În centrul vechi al Sibiului.',
    latitude: 45.7983,
    longitude: 24.1510,
  },
  {
    name: 'Capsula Oradea – Piața Unirii',
    description: 'Art-nouveau și istorie.',
    latitude: 47.0547,
    longitude: 21.9281,
  },
  {
    name: 'Capsula Sighișoara – Cetate',
    description: 'Orașul medieval în miniatură.',
    latitude: 46.2190,
    longitude: 24.7924,
  },
  {
    name: 'Capsula Suceava – Cetatea de Scaun',
    description: 'Pe urmele voievozilor.',
    latitude: 47.6519,
    longitude: 26.2556,
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
          status: 'FOUND',         // enum value
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

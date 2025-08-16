import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // پاکسازی دیتای قبلی
  await prisma.carTrim.deleteMany();
  await prisma.carModel.deleteMany();
  await prisma.carBrand.deleteMany();

  // ------------------------
  // Brand: پژو
  // ------------------------
  const peugeot = await prisma.carBrand.create({
    data: {
      title: 'پژو',
      carModel: {
        create: [
          {
            title: '206',
            carTrim: {
              create: [
                { title: 'تیپ 1', firstYearProd: 1380, lastYearProd: 1385 },
                { title: 'تیپ 2', firstYearProd: 1379, lastYearProd: 1397 },
                { title: 'تیپ 3', firstYearProd: 1384, lastYearProd: 1390 },
                { title: 'تیپ 4', firstYearProd: 1382, lastYearProd: 1386 },
                { title: 'تیپ 5', firstYearProd: 1380, lastYearProd: 1400 },
                { title: 'تیپ 6', firstYearProd: 1385, lastYearProd: 1392 },
                { title: 'SD', firstYearProd: 1386, lastYearProd: 1402 },
              ],
            },
          },
          {
            title: '207',
            carTrim: {
              create: [
                { title: 'i', firstYearProd: 1390, lastYearProd: 1403 },
                { title: 'MC', firstYearProd: 1395, lastYearProd: 1402 },
              ],
            },
          },
          {
            title: '405',
            carTrim: {
              create: [
                { title: 'GL', firstYearProd: 1369, lastYearProd: 1375 },
                { title: 'GLX', firstYearProd: 1370, lastYearProd: 1398 },
                { title: 'SLX', firstYearProd: 1388, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: 'پارس',
            carTrim: {
              create: [
                { title: 'ELX', firstYearProd: 1380, lastYearProd: 1395 },
                { title: 'LX', firstYearProd: 1389, lastYearProd: 1402 },
                { title: 'XU7', firstYearProd: 1390, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: '407',
            carTrim: {
              create: [
                { title: 'استاندارد', firstYearProd: 1385, lastYearProd: 1390 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: KIA
  // ------------------------
  const kia = await prisma.carBrand.create({
    data: {
      title: 'KIA',
      carModel: {
        create: [
          {
            title: 'Cerato',
            carTrim: {
              create: [
                { title: '1.6 لیتری', firstYearProd: 1395, lastYearProd: 1397 },
                { title: '2.0 لیتری', firstYearProd: 1395, lastYearProd: 1397 },
                { title: 'آپشنال', firstYearProd: 1396, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: 'Sportage',
            carTrim: {
              create: [
                { title: 'Standard', firstYearProd: 1391, lastYearProd: 1394 },
                { title: 'QL', firstYearProd: 1395, lastYearProd: 1398 },
                { title: 'GT Line', firstYearProd: 1396, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: 'Rio',
            carTrim: {
              create: [
                { title: 'سدان', firstYearProd: 1384, lastYearProd: 1391 },
              ],
            },
          },
          {
            title: 'Optima',
            carTrim: {
              create: [
                { title: 'JF', firstYearProd: 1395, lastYearProd: 1398 },
              ],
            },
          },
          {
            title: 'Pride',
            carTrim: {
              create: [
                { title: 'Saba', firstYearProd: 1372, lastYearProd: 1395 },
                { title: 'Nasim', firstYearProd: 1372, lastYearProd: 1395 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: Hyundai
  // ------------------------
  const hyundai = await prisma.carBrand.create({
    data: {
      title: 'Hyundai',
      carModel: {
        create: [
          {
            title: 'سوناتا',
            carTrim: {
              create: [
                { title: 'YF', firstYearProd: 1389, lastYearProd: 1393 },
                { title: 'LF', firstYearProd: 1394, lastYearProd: 1396 },
                { title: 'Hybrid', firstYearProd: 1395, lastYearProd: 1398 },
              ],
            },
          },
          {
            title: 'توسان',
            carTrim: {
              create: [
                { title: 'Standard', firstYearProd: 1392, lastYearProd: 1397 },
                { title: 'IX35', firstYearProd: 1390, lastYearProd: 1395 },
                { title: 'TL', firstYearProd: 1396, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: 'آوانته',
            carTrim: {
              create: [
                { title: 'دنده ای', firstYearProd: 1385, lastYearProd: 1392 },
                { title: 'اتوماتیک', firstYearProd: 1385, lastYearProd: 1392 },
              ],
            },
          },
          {
            title: 'اکسنت',
            carTrim: {
              create: [
                { title: 'Blue', firstYearProd: 1396, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: 'i20',
            carTrim: {
              create: [
                { title: 'مونتاژ', firstYearProd: 1396, lastYearProd: 1399 },
              ],
            },
          },
          {
            title: 'i10',
            carTrim: {
              create: [
                { title: 'مونتاژ', firstYearProd: 1396, lastYearProd: 1399 },
              ],
            },
          },
          {
            title: 'سانتافه',
            carTrim: {
              create: [
                { title: 'DM', firstYearProd: 1393, lastYearProd: 1397 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: Benz
  // ------------------------
  const benz = await prisma.carBrand.create({
    data: {
      title: 'Benz',
      carModel: {
        create: [
          {
            title: 'E200',
            carTrim: {
              create: [
                { title: 'Avantgarde', firstYearProd: 1395, lastYearProd: 1399 },
                { title: 'W211', firstYearProd: 1385, lastYearProd: 1390 },
              ],
            },
          },
          {
            title: 'C200',
            carTrim: {
              create: [
                { title: 'Standard', firstYearProd: 1394, lastYearProd: 1398 },
              ],
            },
          },
          {
            title: 'E350',
            carTrim: {
              create: [
                { title: 'کوپه', firstYearProd: 1389, lastYearProd: 1394 },
              ],
            },
          },
          {
            title: 'S500',
            carTrim: {
              create: [
                { title: 'لانگ', firstYearProd: 1385, lastYearProd: 1392 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: پیکان
  // ------------------------
  const peykan = await prisma.carBrand.create({
    data: {
      title: 'پیکان',
      carModel: {
        create: [
          {
            title: 'پیکان جوانان',
            carTrim: {
              create: [
                { title: 'Standard', firstYearProd: 1354, lastYearProd: 1364 },
              ],
            },
          },
          {
            title: 'پیکان وانت',
            carTrim: {
              create: [
                { title: 'Standard', firstYearProd: 1346, lastYearProd: 1384 },
              ],
            },
          },
          {
            title: 'پیکان لوکس',
            carTrim: {
              create: [
                { title: 'Standard', firstYearProd: 1346, lastYearProd: 1384 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: سمند
  // ------------------------
  const samand = await prisma.carBrand.create({
    data: {
      title: 'سمند',
      carModel: {
        create: [
          {
            title: 'سمند',
            carTrim: {
              create: [
                { title: 'LX', firstYearProd: 1380, lastYearProd: 1401 },
                { title: 'سورن', firstYearProd: 1386, lastYearProd: 1398 },
                { title: 'ELX', firstYearProd: 1382, lastYearProd: 1395 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: ایران خودرو
  // ------------------------
  const ikco = await prisma.carBrand.create({
    data: {
      title: 'ایران خودرو',
      carModel: {
        create: [
          {
            title: 'دنا',
            carTrim: {
              create: [
                { title: 'پلاس', firstYearProd: 1395, lastYearProd: 1403 },
                { title: 'توربو', firstYearProd: 1396, lastYearProd: 1403 },
              ],
            },
          },
          {
            title: 'رانا',
            carTrim: {
              create: [
                { title: 'پلاس', firstYearProd: 1391, lastYearProd: 1403 },
              ],
            },
          },
          {
            title: 'تارا',
            carTrim: {
              create: [
                { title: 'اتوماتیک', firstYearProd: 1399, lastYearProd: 1403 },
                { title: 'دنده ای', firstYearProd: 1399, lastYearProd: 1403 },
              ],
            },
          },
          {
            title: 'ری را',
            carTrim: {
              create: [
                { title: 'K125', firstYearProd: 1403, lastYearProd: 1404 },
              ],
            },
          },
          {
            title: 'آریسان',
            carTrim: {
              create: [
                { title: '2', firstYearProd: 1400, lastYearProd: 1403 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: سایپا
  // ------------------------
  const saipa = await prisma.carBrand.create({
    data: {
      title: 'سایپا',
      carModel: {
        create: [
          {
            title: 'پراید',
            carTrim: {
              create: [
                { title: '111', firstYearProd: 1388, lastYearProd: 1399 },
                { title: '131', firstYearProd: 1388, lastYearProd: 1399 },
                { title: '132', firstYearProd: 1386, lastYearProd: 1399 },
                { title: '141', firstYearProd: 1380, lastYearProd: 1395 },
                { title: '151 وانت', firstYearProd: 1391, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: 'تیبا',
            carTrim: {
              create: [
                { title: '1', firstYearProd: 1387, lastYearProd: 1400 },
                { title: '2', firstYearProd: 1392, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: 'ساینا',
            carTrim: {
              create: [
                { title: 'EX', firstYearProd: 1395, lastYearProd: 1403 },
                { title: 'S', firstYearProd: 1398, lastYearProd: 1403 },
              ],
            },
          },
          {
            title: 'کوییک',
            carTrim: {
              create: [
                { title: 'R', firstYearProd: 1396, lastYearProd: 1403 },
                { title: 'S', firstYearProd: 1398, lastYearProd: 1403 },
              ],
            },
          },
          {
            title: 'شاهین',
            carTrim: {
              create: [
                { title: 'G', firstYearProd: 1399, lastYearProd: 1403 },
              ],
            },
          },
          {
            title: 'اطلس',
            carTrim: {
              create: [
                { title: 'اتوماتیک', firstYearProd: 1401, lastYearProd: 1403 },
              ],
            },
          },
          {
            title: 'سهند',
            carTrim: {
              create: [
                { title: 'S', firstYearProd: 1402, lastYearProd: 1403 },
              ],
            },
          },
          {
            title: 'آریا',
            carTrim: {
              create: [
                { title: 'اتوماتیک', firstYearProd: 1401, lastYearProd: 1403 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: رنو
  // ------------------------
  const renault = await prisma.carBrand.create({
    data: {
      title: 'رنو',
      carModel: {
        create: [
          {
            title: 'تندر 90',
            carTrim: {
              create: [
                { title: 'E2', firstYearProd: 1386, lastYearProd: 1398 },
                { title: 'پلاس', firstYearProd: 1394, lastYearProd: 1398 },
              ],
            },
          },
          {
            title: 'ساندرو',
            carTrim: {
              create: [
                { title: 'استپ وی', firstYearProd: 1394, lastYearProd: 1398 },
              ],
            },
          },
          {
            title: 'مگان',
            carTrim: {
              create: [
                { title: '1600', firstYearProd: 1387, lastYearProd: 1394 },
                { title: '2000', firstYearProd: 1387, lastYearProd: 1394 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: تویوتا
  // ------------------------
  const toyota = await prisma.carBrand.create({
    data: {
      title: 'تویوتا',
      carModel: {
        create: [
          {
            title: 'کمری',
            carTrim: {
              create: [
                { title: 'GLX', firstYearProd: 1385, lastYearProd: 1396 },
                { title: 'Hybrid', firstYearProd: 1395, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: 'پرادو',
            carTrim: {
              create: [
                { title: '4 در', firstYearProd: 1389, lastYearProd: 1397 },
              ],
            },
          },
          {
            title: 'هایلوکس',
            carTrim: {
              create: [
                { title: 'دو کابین', firstYearProd: 1390, lastYearProd: 1398 },
              ],
            },
          },
          {
            title: 'کورولا',
            carTrim: {
              create: [
                { title: 'XLi', firstYearProd: 1392, lastYearProd: 1396 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: مزدا
  // ------------------------
  const mazda = await prisma.carBrand.create({
    data: {
      title: 'مزدا',
      carModel: {
        create: [
          {
            title: '3',
            carTrim: {
              create: [
                { title: 'نیو', firstYearProd: 1395, lastYearProd: 1398 },
              ],
            },
          },
          {
            title: '323',
            carTrim: {
              create: [
                { title: 'F', firstYearProd: 1378, lastYearProd: 1386 },
              ],
            },
          },
          {
            title: 'وانت',
            carTrim: {
              create: [
                { title: '2000', firstYearProd: 1380, lastYearProd: 1395 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: سیتروئن
  // ------------------------
  const citroen = await prisma.carBrand.create({
    data: {
      title: 'سیتروئن',
      carModel: {
        create: [
          {
            title: 'زانتیا',
            carTrim: {
              create: [
                { title: 'SX', firstYearProd: 1380, lastYearProd: 1389 },
              ],
            },
          },
          {
            title: 'C5',
            carTrim: {
              create: [
                { title: 'استاندارد', firstYearProd: 1396, lastYearProd: 1398 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: چری
  // ------------------------
  const chery = await prisma.carBrand.create({
    data: {
      title: 'چری',
      carModel: {
        create: [
          {
            title: 'آریزو 6',
            carTrim: {
              create: [
                { title: 'توربو', firstYearProd: 1397, lastYearProd: 1402 },
              ],
            },
          },
          {
            title: 'تیگو 7',
            carTrim: {
              create: [
                { title: 'IE', firstYearProd: 1396, lastYearProd: 1400 },
              ],
            },
          },
          {
            title: 'MVM X22',
            carTrim: {
              create: [
                { title: 'اسپورت', firstYearProd: 1396, lastYearProd: 1402 },
              ],
            },
          },
        ],
      },
    },
  });

  // ------------------------
  // Brand: بی ام و
  // ------------------------
  const bmw = await prisma.carBrand.create({
    data: {
      title: 'بی ام و',
      carModel: {
        create: [
          {
            title: '320i',
            carTrim: {
              create: [
                { title: 'استاندارد', firstYearProd: 1392, lastYearProd: 1397 },
              ],
            },
          },
          {
            title: '528i',
            carTrim: {
              create: [
                { title: 'F10', firstYearProd: 1390, lastYearProd: 1395 },
              ],
            },
          },
          {
            title: 'X3',
            carTrim: {
              create: [
                { title: '28i', firstYearProd: 1393, lastYearProd: 1397 },
              ],
            },
          },
        ],
      },
    },
  });

  // Add more brands if needed...

  console.log('✅ Seed کامل با سال شمسی و تریم‌های درست انجام شد.');
}

main()
  .catch((e) => {
    console.error('❌ خطا در Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
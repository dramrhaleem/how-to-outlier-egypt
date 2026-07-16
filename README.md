# Outlier Egypt Guide

صفحة عربية مستقلة تشرح رحلة التسجيل والعمل والدفع على Outlier للمستخدمين في مصر.

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Deployment

المشروع Static ولا يحتاج خادمًا. بعد `npm run build` ارفع محتويات مجلد `dist/` إلى Vercel أو Netlify أو Cloudflare Pages أو أي استضافة ملفات ثابتة.

Build command: `npm run build`  
Output directory: `dist`

## Content maintenance

- المعلومات الرسمية مرتبطة بمصادر Outlier داخل `src/content.ts`.
- راجع الأسعار والدول المتاحة وسياسات الدفع قبل أي تحديث رئيسي.
- أبقِ النصائح المصرية واضحة بوصفها خبرة عملية لا ضمانًا رسميًا.
- رابط الإحالة موجود في ثابت `REFERRAL_URL`، ورابط فرصة مصر الرسمية في `OFFICIAL_EGYPT_URL`.

## Attribution

The interactive 3D scene uses the MIT-licensed Spline Scene React integration shared by Serafim on 21st.dev and the linked NEXBOT community scene. The guide itself is independent and is not affiliated with Outlier or Scale AI.


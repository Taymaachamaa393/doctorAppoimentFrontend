import { Rating } from './rating.model'; // استيراد Rating من ملفه




export interface Doctor {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  password: string; 
  specialization: string;
  license_number: string;
  certificate: File;
  certificate_path: string;
  certificate_oath: string;
  certificate_url: string;
  status: 'pending' | 'approved' | 'rejected';
  is_verified: number;
  created_at: string;
  updated_at: string;

  profileImageUrl: string;
 
}



export interface DoctorCertificate {
  name: string;
  specialization: string;
  certificate_url: string;
}

export interface DoctorCertificateResponse {
  doctor: DoctorCertificate;
}






export interface DoctorPublic {
  id: number;
  name: string;
  email: string;
  specialization: string;
  license_number: string;
  certificate_path: string;
  is_verified: number;
  created_at: string;
  updated_at: string;
  
  // يتم توليد URL لصورة الشهادة عند الجلب
  certificate_url?: string;

  ratings?: Rating[];  // أضف هذا السطر

}




// ✅ فوائد استخدام واجهتين منفصلتين
// ✔ تقليل البيانات المحملة من API عند جلب الأطباء، مما يجعل الأداء أسرع.
// ✔ تحسين تنظيم الكود، بحيث يكون لكل وظيفة واجهتها الخاصة.
// ✔ تجنب التداخل بين بيانات تسجيل الدخول والبيانات العامة للأطباء.


// 🔥 الخلاصة
// إذا كنت تستخدم نفس الواجهة (Doctor) لكل شيء، فهذا يسبب تحميل بيانات غير ضرورية وإرباك الكود.
// الحل الأفضل هو إنشاء واجهتين (DoctorLogin و DoctorPublic)، بحيث تستخدم DoctorLogin لتسجيل الدخول، و DoctorPublic لجلب بيانات الأطباء للعرض.
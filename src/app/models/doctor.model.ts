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




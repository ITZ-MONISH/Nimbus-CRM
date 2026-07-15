import type { Customer } from '@/types';

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const raw: Array<[string, string, string, Customer['status'], number, number, string]> = [
  ['Amelia Hart', 'amelia.hart@brightloop.io', 'Brightloop', 'active', 48200, 34, '2023-02-14'],
  ['Noah Kessler', 'noah.k@fernwaylabs.com', 'Fernway Labs', 'active', 31500, 22, '2023-05-03'],
  ['Priya Chandran', 'priya.c@quillhq.com', 'Quill HQ', 'lead', 0, 0, '2024-11-20'],
  ['Marcus Webb', 'marcus@ridgeline.co', 'Ridgeline Co', 'active', 76900, 51, '2022-08-30'],
  ['Sofia Alvarez', 'sofia.alvarez@paperwren.com', 'Paperwren', 'churned', 12800, 9, '2021-12-01'],
  ['Jonah Baptiste', 'jonah.b@northtide.dev', 'Northtide', 'active', 54300, 28, '2023-01-18'],
  ['Lena Kowalski', 'lena.k@vellumworks.com', 'Vellum Works', 'lead', 0, 0, '2025-01-09'],
  ['Ethan Brooks', 'ethan.brooks@stackframe.io', 'Stackframe', 'active', 91200, 63, '2022-04-11'],
  ['Grace Odum', 'grace.odum@lumenpath.com', 'Lumenpath', 'active', 26400, 17, '2024-02-27'],
  ['Kai Sorensen', 'kai.s@driftwood.app', 'Driftwood', 'churned', 8900, 6, '2021-06-15'],
  ['Isabel Marsh', 'isabel.marsh@copperline.co', 'Copperline', 'active', 43700, 30, '2023-09-08'],
  ['Tobias Lindqvist', 'tobias.l@haloworks.io', 'Haloworks', 'lead', 0, 0, '2025-03-02'],
  ['Ruth Ademola', 'ruth.a@granaryapp.com', 'Granary', 'active', 68500, 44, '2022-11-19'],
  ['Diego Palacios', 'diego.p@fenwickco.com', 'Fenwick & Co', 'active', 37200, 25, '2023-07-25'],
  ['Hana Yoshida', 'hana.y@wren-labs.com', 'Wren Labs', 'churned', 15600, 11, '2022-01-30'],
  ['Owen Fitzgerald', 'owen.f@basaltsoft.com', 'Basalt Software', 'active', 58900, 39, '2023-03-12'],
  ['Clara Dunmore', 'clara.d@thistleworks.io', 'Thistleworks', 'lead', 0, 0, '2025-02-14'],
  ['Samuel Ortiz', 'samuel.ortiz@pinegate.co', 'Pinegate', 'active', 82100, 55, '2022-06-06'],
  ['Nadia Farouk', 'nadia.f@cobaltreach.com', 'Cobalt Reach', 'active', 29800, 19, '2024-05-21'],
  ['Milo Tanaka', 'milo.t@sundialhq.com', 'Sundial HQ', 'churned', 6400, 4, '2021-09-10'],
];

export const customers: Customer[] = raw.map(([name, email, company, status, revenue, orders, joinedAt], i) => ({
  id: `CUST-${String(i + 1).padStart(3, '0')}`,
  name,
  email,
  company,
  status,
  revenue,
  orders,
  joinedAt,
  avatarInitials: initials(name),
}));

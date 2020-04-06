import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  // {
  //   name: 'Giới thiệu',
  //   url: '/',
  //   icon: 'fa fa-info',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  {
    name: 'Quản lý cơ quan',
    url: '/QuanLyCoQuan/coQuan',
    icon: 'fa fa-institution'
  },
  {
    name: 'Quản lý Phông',
    url: "/QuanLyPhong/phong",
    icon: 'icon-note',
    // children:[
    //   {
    //      name: "Phông",
         
    //      icon: "fa fa-navicon"
    //   },
    //   {
    //     name:'Hành pháp',
    //     url: "/",
    //     icon: "fa fa-legal",
    //   },
    //   {
    //     name:'Tư pháp',
    //     url: "/",
    //     icon: "fa fa-balance-scale",
    //   },
    //   {
    //     name:'Đơn vị hành chính',
    //     url: "",
    //     icon: "fa fa-institution",
    //   }
    // ]
  },

  // {
  //   name: 'Quản lý kho',
  //   url: '/stock',
  //   icon: 'icon-home'
  // },
  {
    name: 'Quản lý danh mục',
    url: '/QuanLyDanhMuc/danhMuc',
    icon: 'icon-list',
    // children: [
    //   {
    //     name: 'Loại văn bản',
    //     url: '/QuanLyLoaiVanBan/loaiVanBan/',
    //     icon: 'icon-folder-alt'
    //   },
    //   {
    //     name: 'Loại hồ sơ',
    //     url: '/QuanLyLoaiHoSo/loaiHoSo/',
    //     icon: 'icon-book-open'
    //   },
    //   {
    //     name: 'Loại cơ quan',
    //     url: '/QuanLyOrganType/organType/',
    //     icon: 'icon-home'
    //   },
    //   {
    //     name: 'Ngôn ngữ',
    //     url: '/QuanLyNgonNgu/ngonNgu/',
    //     icon: 'icon-map'
    //   },
    //   {
    //     name: 'Công cụ tra cứu',
    //     url: '',
    //     icon: 'icon-briefcase'
    //   },
    //   {
    //     name: 'Tình trạng vật lý',
    //     url: '/QuanLyTinhTrangVatLy/tinhTrangVatLy/',
    //     icon: 'icon-info'
    //   },
    //   {
    //     name: 'Mức độ tin cậy',
    //     url: '/QuanLyMucDoTinCay/mucDoTinCay/',
    //     icon: 'icon-lock-open'
    //   }
    // ]
  },
  {
    name: 'Quản lý hộp số',
    url: '/HopSo/quanLyHopSo',
    icon: 'fa fa-cube'
  },
  {
    name: 'Quản lý hồ sơ',
    url: '/QuanLyHoSo/hoSo',
    icon: 'fa fa-folder'
  },
  {
    name: 'Quản lý tài liệu',
    url: '/QuanLyTaiLieu/taiLieu',
    icon: 'fa fa-file-text'
  },
  {
    name: 'Thống kê báo cáo',
    url: '/ThongKe/thongKeTongQuat',
    icon: 'icon-chart'
  },
  {
    name: 'Nhật ký',
    url: '/ThongKe/nhatKy',
    icon: 'fa fa-address-book-o'
  },
  {
    name: 'Quản lý người dùng',
    url: '/QuanLyNguoiDung/nguoiDung',
    icon: 'icon-user'
  },
  {
    name: 'Quản lý chữ ký số',
    url: '/QuanLyChuKySo/chuKySo',
    icon: 'fa fa-address-book-o'
  }
//   },
//   {
//     name: 'Colors',
//     url: '/theme/colors',
//     icon: 'icon-drop'
//   },
//   {
//     name: 'Typography',
//     url: '/theme/typography',
//     icon: 'icon-pencil'
//   },
//   {
//     title: true,
//     name: 'Components'
//   },
//   {
//     name: 'Base',
//     url: '/base',
//     icon: 'icon-puzzle',
//     children: [
//       {
//         name: 'Cards',
//         url: '/base/cards',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Carousels',
//         url: '/base/carousels',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Collapses',
//         url: '/base/collapses',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Forms',
//         url: '/base/forms',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Pagination',
//         url: '/base/paginations',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Popovers',
//         url: '/base/popovers',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Progress',
//         url: '/base/progress',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Switches',
//         url: '/base/switches',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Tables',
//         url: '/base/tables',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Tabs',
//         url: '/base/tabs',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Tooltips',
//         url: '/base/tooltips',
//         icon: 'icon-puzzle'
//       }
//     ]
//   },
//   {
//     name: 'Buttons',
//     url: '/buttons',
//     icon: 'icon-cursor',
//     children: [
//       {
//         name: 'Buttons',
//         url: '/buttons/buttons',
//         icon: 'icon-cursor'
//       },
//       {
//         name: 'Dropdowns',
//         url: '/buttons/dropdowns',
//         icon: 'icon-cursor'
//       },
//       {
//         name: 'Brand Buttons',
//         url: '/buttons/brand-buttons',
//         icon: 'icon-cursor'
//       }
//     ]
//   },
//   {
//     name: 'Charts',
//     url: '/charts',
//     icon: 'icon-pie-chart'
//   },
//   {
//     name: 'Icons',
//     url: '/icons',
//     icon: 'icon-star',
//     children: [
//       {
//         name: 'CoreUI Icons',
//         url: '/icons/coreui-icons',
//         icon: 'icon-star',
//         badge: {
//           variant: 'success',
//           text: 'NEW'
//         }
//       },
//       {
//         name: 'Flags',
//         url: '/icons/flags',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Font Awesome',
//         url: '/icons/font-awesome',
//         icon: 'icon-star',
//         badge: {
//           variant: 'secondary',
//           text: '4.7'
//         }
//       },
//       {
//         name: 'Simple Line Icons',
//         url: '/icons/simple-line-icons',
//         icon: 'icon-star'
//       }
//     ]
//   },
//   {
//     name: 'Notifications',
//     url: '/notifications',
//     icon: 'icon-bell',
//     children: [
//       {
//         name: 'Alerts',
//         url: '/notifications/alerts',
//         icon: 'icon-bell'
//       },
//       {
//         name: 'Badges',
//         url: '/notifications/badges',
//         icon: 'icon-bell'
//       },
//       {
//         name: 'Modals',
//         url: '/notifications/modals',
//         icon: 'icon-bell'
//       }
//     ]
//   },
//   {
//     name: 'Widgets',
//     url: '/widgets',
//     icon: 'icon-calculator',
//     badge: {
//       variant: 'info',
//       text: 'NEW'
//     }
//   },
//   {
//     divider: true
//   },
//   {
//     title: true,
//     name: 'Extras',
//   },
//   {
//     name: 'Pages',
//     url: '/pages',
//     icon: 'icon-star',
//     children: [
//       {
//         name: 'Login',
//         url: '/login',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Register',
//         url: '/register',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Error 404',
//         url: '/404',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Error 500',
//         url: '/500',
//         icon: 'icon-star'
//       }
//     ]
//   },
//   {
//     name: 'Disabled',
//     url: '/dashboard',
//     icon: 'icon-ban',
//     badge: {
//       variant: 'secondary',
//       text: 'NEW'
//     },
//     attributes: { disabled: true },
//   },
//   {
//     name: 'Download CoreUI',
//     url: 'http://coreui.io/angular/',
//     icon: 'icon-cloud-download',
//     class: 'mt-auto',
//     variant: 'success',
//     attributes: { target: '_blank', rel: 'noopener' }
//   },
//   {
//     name: 'Try CoreUI PRO',
//     url: 'http://coreui.io/pro/angular/',
//     icon: 'icon-layers',
//     variant: 'danger',
//     attributes: { target: '_blank', rel: 'noopener' }
//   }
];

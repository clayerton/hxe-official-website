import { Route, Routes, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Images from "@/constant";
import {
  Visibility as VisibilityIcon,
  Home as HomeIcon,
  Equalizer as EqualizerIcon,
  Redeem as RedeemIcon,
} from "@material-ui/icons";
// 头部
const Home = React.lazy(() => import("@/pages/home")); //首页
const Career = React.lazy(() => import("@/pages/career")); //职业发展
const Contact = React.lazy(() => import("@/pages/contact")); //联系我们
const Faq = React.lazy(() => import("@/pages/faq")); //常见问题

// 二层
const Irrigation = React.lazy(() => import("@/pages/irrigation")); //精准灌溉
const Crops = React.lazy(() => import("@/pages/crops")); //作物方案

const Products = React.lazy(() => import("@/pages/products")); //产品信息  
const Offering = React.lazy(() => import("@/pages/products/offering")); //产品信息---耐特菲姆滴灌-滴灌喷灌压力补偿滴灌管水肥一体化技术
const DripIrrigationProduct = React.lazy(() => import("@/pages/products/dripIrrigationProduct")); //产品信息---滴灌管
const DripperPage = React.lazy(() => import("@/pages/products/dripperPage")); //产品信息--管上式滴头
const SprinklerIrrigation = React.lazy(() => import("@/pages/products/sprinklerIrrigation")); //产品信息---喷头
const Filters = React.lazy(() => import("@/pages/products/filters")); //产品信息---过滤器
const Valves = React.lazy(() => import("@/pages/products/valves")); //产品信息---阀门

const DigitalFarming = React.lazy(() => import("@/pages/digital-farming")); //数字农业

const Projects = React.lazy(() => import("@/pages/projects")); //项目案例

const AboutUs = React.lazy(() => import("@/pages/about-us")); //关于我们
export const routesFront = [
  {
    path: "/career",
    pathName: "职业发展",
  },
  {
    path: "/contact",
    pathName: "联系我们",
  },
  {
    path: "/faq",
    pathName: "常见问题",
  },

]
export const routesList = [
  {
    path: "/irrigation",
    pathName: "精准灌溉",
  },
  {
    path: "/crops",
    pathName: "作物方案",
  },
  {
    path: "/products",
    pathName: "产品信息",
    children: [
      {
        path: "/product-offering",
        pathName: "耐特菲姆滴灌-滴灌喷灌压力补偿滴灌管水肥一体化技术",
        isH4: true
      },
      {
        path: "/product-offering/drip-irrigation-products",
        pathName: "滴灌管",
      },
      {
        path: "/product-offering/dripper-page",
        pathName: "管上式滴头",
      },
      {
        path: "/product-offering/Sprinkler-irrigation",
        pathName: "喷头，微喷",
      },
      {
        path: "/product-offering/filters",
        pathName: "过滤器",
      },
      {
        path: "/product-offering/valves",
        pathName: "阀门",
      },

    ]
  },
  {
    path: "/digital-farming",
    pathName: "数字农业",
  },
  {
    path: "/projects",
    pathName: "项目案例",
  },
  {
    path: "/about-us",
    pathName: "关于我们",
  },
];
const syncRouter = (table) => {
  let mRouteTable = [];
  table.forEach((route) => {
    mRouteTable.push({
      path: route.path,
      element: (
        <Suspense fallback={<div>路由加载ing...</div>}>
          {route.component}
        </Suspense>
      ),
      children: route.children && syncRouter(route.children),
    });
  });
  return mRouteTable;
};

const RouterPage = ({ initialRoute }) => (
  <Routes>
    <Route path="*" element={<Navigate to="/home" />}></Route>
    <Route index path="home" element={<Home />} />
    <Route path="career" element={<Career />} />
    <Route path="contact" element={<Contact />} />
    <Route path="faq" element={<Faq />} />
    <Route path="irrigation" element={<Irrigation />} />
    <Route path="crops" element={<Crops />} />
    <Route path="products">
      <Route index element={<Products />} />
      <Route path="product-offering" >
        <Route index element={<Offering />} />
        <Route path="drip-irrigation-products" element={<DripIrrigationProduct />} />
        <Route path="dripper-page" element={<DripperPage />} />
        <Route path="Sprinkler-irrigation" element={<SprinklerIrrigation />} />
        <Route path="filters" element={<Filters />} />
        <Route path="valves" element={<Valves />} />
      </Route>
    </Route>
    <Route path="digital-farming" element={<DigitalFarming />} />
    <Route path="projects" element={<Projects />} />
    <Route path="about-us" element={<AboutUs />} />
  </Routes>
);
export default RouterPage;

import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Users from "@/components/Users";
import Xml from "@/components/Xml";
import Inspection from "@/components/Inspection";
import Log from "@/components/Log";
import Online from "@/components/Online";
import Offline from "@/components/Offline";
import Home from "@/components/Home";
import Server from "@/components/Server";
import Policy from "@/components/Policy";
import Upload from "@/components/Upload";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/server",
      name: "Server",
      component: Server
    },
    {
      path: "/policy",
      name: "Policy",
      component: Policy
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/xml",
      name: "Xml",
      component: Xml
    },
    {
      path: "/inspection",
      name: "Inspection",
      component: Inspection
    },
    {
      path: "/online",
      name: "Online",
      component: Online
    },
    {
      path: "/offline",
      name: "Offline",
      component: Offline
    },
    {
      path: "/log",
      name: "Log",
      component: Log
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/upload",
      name: "Upload",
      component: Upload
    },
    // {
    //   path: "/ping",
    //   name: "Ping",
    //   component: Ping
    // },
    
  ]
});

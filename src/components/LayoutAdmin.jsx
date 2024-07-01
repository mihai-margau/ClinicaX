// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Logo from "../assets/images/favicon.ico";
import { Outlet, useLocation } from "react-router-dom";

import {
  Dropdown,
  DropdownButton,
  // DropdownItem,
  // DropdownLabel,
  // DropdownMenu,
} from "@/components/catalystUi/dropdown";
import { StackedLayout } from "@/components/catalystUi/stacked-layout";
import {
  Navbar,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarDivider,
  NavbarSpacer,
} from "@/components/catalystUi/navbar";
import {
  Sidebar,
  SidebarLabel,
  SidebarBody,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
} from "@/components/catalystUi/sidebar";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  // ArrowLeftIcon,
} from "@heroicons/react/16/solid";

import useAuth from "@/hooks/useAuth";
import { UserCircleIcon } from "@heroicons/react/20/solid";

const navItems = [{ id: 1, label: "Programări efectuate", url: "/dashboard" }];

// function TeamDropdownMenu() {
//   return (
//     <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
//       <DropdownItem
//         href="/"
//         className="transition-none cursor-pointer data-[focus]:bg-gray-200 data-[focus]:text-black [&>[data-slot=icon]]:data-[focus]:text-gray-800"
//       >
//         <ArrowLeftIcon />
//         <DropdownLabel>Mergi înapoi la site</DropdownLabel>
//       </DropdownItem>
//     </DropdownMenu>
//   );
// }

export default function LayoutAdmin() {
  const location = useLocation();
  const { auth } = useAuth();
  return (
    <StackedLayout
      navbar={
        <Navbar>
          <Dropdown>
            <NavbarItem href="/" className="max-lg:hidden">
              <img className="md:block h-10 w-auto hidden" src={Logo} />
              <NavbarLabel>Clinica X</NavbarLabel>
              {/* <ChevronDownIcon /> */}
            </NavbarItem>
            {/* <TeamDropdownMenu /> */}
          </Dropdown>
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
            {navItems.map(({ id, label, url }) => {
              return (
                <div key={id}>
                  <NavbarItem
                    key={id}
                    href={url}
                    current={location.pathname === url}
                  >
                    {label}
                  </NavbarItem>
                </div>
              );
            })}
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem aria-label="Welcome">
              <UserCircleIcon />
              <h2 className="text-sm font-medium tracking-tight">
                Bine ai revenit, {auth?.username}
              </h2>
            </NavbarItem>
            <NavbarItem
              aria-label="Logout"
              href="/logout"
              className="cursor-pointer"
            >
              <ArrowRightStartOnRectangleIcon />
              <h2 className="text-sm font-medium tracking-tight">
                Ieși din cont
              </h2>
            </NavbarItem>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                <img className="md:block h-8 w-auto hidden" src={Logo} />
                <SidebarLabel>Clinica X</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              {/* <TeamDropdownMenu /> */}
            </Dropdown>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              {navItems.map(({ id, label, url }) => (
                <SidebarItem key={id} href={url} current>
                  {label}
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <Outlet />
    </StackedLayout>
  );
}

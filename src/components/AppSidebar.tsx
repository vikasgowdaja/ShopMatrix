import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Building2,
  LayoutDashboard,
  Package,
  Laptop,
  Smartphone,
  Monitor,
  Tv,
  HardDrive,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { api } from "@/lib/api";
import { Company, Category } from "@/types";

const categoryIcons: Record<string, any> = {
  Laptop: Laptop,
  Phone: Smartphone,
  Computer: Monitor,
  TV: Tv,
  Pendrive: HardDrive,
};

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const collapsed = state === "collapsed";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesData, categoriesData] = await Promise.all([
          api.getCompanies(),
          api.getCategories(),
        ]);
        setCompanies(companiesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/"
                  
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/products"
                   
                  >
                    <Package className="h-4 w-4" />
                    {!collapsed && <span>All Products</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!loading && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Companies</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {companies.map((company) => (
                    <SidebarMenuItem key={company.code}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={`/company/${company.code}`}
                         
                        >
                          <Building2 className="h-4 w-4" />
                          {!collapsed && <span>{company.name}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Categories</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categories.map((category) => {
                    const Icon = categoryIcons[category.name] || Package;
                    return (
                      <SidebarMenuItem key={category.name}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={`/category/${category.name}`}
                            
                          >
                            <Icon className="h-4 w-4" />
                            {!collapsed && <span>{category.name}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

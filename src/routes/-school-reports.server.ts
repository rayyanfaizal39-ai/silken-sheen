import { createServerFn } from "@tanstack/react-start";
import type { AdminSchoolReport, SchoolReportFilters } from "@/lib/admin-school-reports";
import { getSupabaseServerClient } from "@/lib/supabase.server";

export const getAdminSchoolReport = createServerFn({ method: "POST" })
  .validator((filters: SchoolReportFilters) => filters)
  .handler(async ({ data: filters }): Promise<AdminSchoolReport> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase is not configured.");

    const { data, error } = await supabase.rpc("get_admin_school_report", {
      p_school_id: filters.schoolId,
      p_age: filters.age,
      p_form: filters.form,
      p_date_range: filters.dateRange,
    });

    if (error) throw error;
    if (!data) throw new Error("No school report was returned.");
    return data as AdminSchoolReport;
  });

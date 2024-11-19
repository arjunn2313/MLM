import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchExpenseCategory, fetchExpenses, postExpense } from "../api/expenseApi";
import toast from "react-hot-toast";

// GET --- HOOK FOR FETCHING ALL EXPENSE
export const useExpenses = (page, search, category, fromDate, toDate) => {
  return useQuery({
    queryKey: ["expenses", page, search, category, fromDate, toDate],
    queryFn: () => fetchExpenses({ page, search, category, fromDate, toDate }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
// GET --- HOOK FOR FETCHING ALL EXPENSE CATEGORY
export const useExpenseCategory = () => {
    return useQuery({
      queryKey: ["expense-category"],
      queryFn: () => fetchExpenseCategory(),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });
  };
// POST --- HOOK FOR NEW CREATING EXPENSE
 
export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: postExpense,
      onSuccess: (data) => {
        toast.success("Expense successfully created!");
        queryClient.invalidateQueries(["expenses"]);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      },
    });
  };
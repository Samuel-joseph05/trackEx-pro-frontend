"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

const DeleteExpenseDialog = ({ expense, handleDelete }) => {
  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full h-12 rounded-xl">
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="border-slate-700 bg-slate-900 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense?</AlertDialogTitle>

            <AlertDialogDescription className="text-slate-400">
              This action cannot be undone.
              <br />
              The expense <strong>{expense.title}</strong> will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => handleDelete(expense._id)}
              className=" bg-red-600 hover:bg-red-700 "
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
};

export default DeleteExpenseDialog;

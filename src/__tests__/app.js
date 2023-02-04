import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import Products from "../App";
import { BrowserRouter } from "react-router-dom";

describe("<Products />", () => {
  it("fetches data from API on mount", async () => {
    const mockGet = jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            name: "Product 1",
            year: 2021,
            color: "red"
          },
          {
            id: 2,
            name: "Product 2",
            year: 2022,
            color: "blue"
          }
        ]
      }
    });
    const { getByText, findByText } = render(<Products />, {
      wrapper: BrowserRouter
    });
    await findByText("Product 1");
    expect(mockGet).toHaveBeenCalledWith(
      "https://reqres.in/api/products?page=1"
    );
    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();
    mockGet.mockRestore();
  });

  it("renders error message on API failure", async () => {
    jest.spyOn(axios, "get").mockRejectedValue("An error occurred");
    const { findByText } = render(<Products />, { wrapper: BrowserRouter });
    const errorMessage = await findByText(
      "An error occurred while fetching the data."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows selected product details in modal", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            name: "Product 1",
            year: 2021,
            color: "red"
          },
          {
            id: 2,
            name: "Product 2",
            year: 2022,
            color: "blue"
          }
        ]
      }
    });
    const { findByText, getByText } = render(<Products />, {
      wrapper: BrowserRouter
    });
    const product1Row = await findByText("Product 1");
    fireEvent.click(product1Row);
    const modal = await findByText("ID: 1");
    expect(modal).toBeInTheDocument();
    expect(getByText("Name: Product 1")).toBeInTheDocument();
    expect(getByText("Year: 2021")).toBeInTheDocument();
    expect(getByText("Color: red")).toBeInTheDocument();
    const closeModalButton = getByText("Close");
    fireEvent.click(closeModalButton);
    const product1RowAfterClose = await findByText("Product 1");
    expect(product1RowAfterClose).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import emojiList from "../emojiList.json";
import App from "../App";

describe("App Tests", () => {
       
       beforeEach(() => {

        render(<App/>);

        });

       test("Header should be rendered",() => {

         const header = screen.getByText("Emoji Search");
         expect(header).toBeInTheDocument();   // Is the header added to the dom?

       }); 

       test("Emoji List title and Image should be rendered",() => {

        const images = screen.getAllByRole("img"); // get all images
        expect(images.length).toBe(22);       // There should be 22 images in total initially

        emojiList.slice(0,20).forEach((item) => {    // first 20 titles should come
            const title = screen.getByText(item.title);
            expect(title).toBeInTheDocument();
        });
    });

    test('Emoji list should be rendered based on filter', () => {
      
        const input = screen.getByRole('textbox');    // select textbox
        const value = "cat";             // set a value to filter the data              
        
        // filter data by value

        const filtered = emojiList.filter(  
            (item) => item.keywords.toLowerCase().includes(value) || item.title.toLowerCase().includes(value)
            ).slice(0, 20);
        console.table(filtered);
        fireEvent.change(input, { target: { value: value } });   // Send value to input and perform filtering

        filtered.forEach((item) => {                   // Is my filtered data being added to the dom?
            const title = screen.getByText(item.title);
            expect(title).toBeInTheDocument();
        });

      });


    test('Clicking on the list element should copy the emoji', () => {
      
        const emoji = screen.getByText('Laughing');
        const parentElement = emoji.parentElement;
        userEvent.click(parentElement);
        expect(parentElement.getAttribute("data-clipboard-text")).toMatch("😆"); // Is data-clipboard text equal?
        
      });



     








})

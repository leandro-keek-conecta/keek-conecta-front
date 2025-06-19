import { Controller, FieldErrors } from "react-hook-form";
import { Box } from "@mui/material";
import InputTex from "../../components/InputText";
import SelectButton from "../../components/selectButtom";
import InputFile from "../InputFIle";

interface Option {
  label: string;
  value: string | number;
}

export interface InputType {
  name: string;
  title: string;
  placeholder?: string;
  type: "text" | "email" | "password" | "Date" | "Select" | "inputFile";
  colSpan?: number;
  rowSpan?: number;
  selectOptions?: Option[];
  rules?: object;
  value?: string | number | FileList;
}

interface FormsProps {
  inputsList: InputType[];
  control: any;
  errors: FieldErrors;
  onInputChange?: (name: string, value: string | number) => void;
}

export default function Forms({
  inputsList,
  control,
  errors,
  onInputChange,
}: FormsProps) {


  return (
    <Box
      className="form-container"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)", // 12 colunas fixas
        gap: 2,
        fontSize: "1.1rem",
        "& input, & .MuiInputBase-input": {
          fontSize: "1.1rem",
        },
        "& label, & .MuiInputLabel-root": {
          fontSize: "1.1rem",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "1.1rem",
        },
        "& ::placeholder": {
          fontSize: "1.1rem",
        },
        "& .MuiSelect-select": {
          fontSize: "1.1rem",
        },
      }}
    >
      {inputsList.map((input, index) => (
        <Box
          key={index}
          sx={{
            gridColumn: {
              xs: "span 12", // responsivo: ocupa linha toda em mobile
              sm: `span ${input.colSpan || 12}`,
            },
          }}
        >
          <Controller
            name={input.name}
            control={control}
            defaultValue={input.value || ""}
            rules={input.rules}
            render={({ field: { onChange, value } }) => {
              if (input.type === "Select") {
                return (
                  <SelectButton
                    label={input.title}
                    options={input.selectOptions || []}
                    placeholder={input.placeholder}
                    value={value || ""}
                    onChange={(selectedValue: string | number | null) => {
                      onChange(selectedValue);
                      onInputChange?.(input.name, selectedValue!);
                    }}
                  />
                );
              }

              if (input.type === "inputFile") {
                return (
                  <InputFile
                    onChange={(event) => {
                      const files = event.target.files;
                      if (files) {
                        onChange(files);
                        onInputChange?.(
                          input.name,
                          Array.from(files)
                            .map((f) => f.name)
                            .join(", ")
                        );
                      }
                    }}
                  />
                );
              }

              return (
                <InputTex
                  label={input.title}
                  placeholder={input.placeholder || ""}
                  type={input.type}
                  value={value || ""}
                  onChange={(e) => {
                    onChange(e.target.value);
                    onInputChange?.(input.name, e.target.value);
                  }}
                  error={!!errors[input.name]}
                  helperText={errors[input.name]?.message as string}
                />
              );
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

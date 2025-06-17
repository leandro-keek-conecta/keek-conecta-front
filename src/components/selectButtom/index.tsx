import { Autocomplete, TextField } from "@mui/material";

interface Option {
  label: string;
  value: string | number;
}
interface SelectTexProps {
  label: string;
  placeholder?: string;
  options: Option[]; // Opções do select
  value?: string | number; // Valor atual
  onChange: (value: string | number | null) => void; // Callback para mudanças
  error?: boolean; // Indica se há erro
  helperText?: string; // Mensagem de erro ou ajuda
}

export default function SelectButton({
  label,
  placeholder = "",
  options,
  value,
  onChange,
  error = false,
  helperText = "",
}: SelectTexProps) {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label} // Exibe o rótulo da opção
      value={options.find((option) => option.value === value) || null} // Associa o valor selecionado
      onChange={(_, newValue: Option | null) => {
        onChange(newValue?.value || null); // Confirma que `newValue` é do tipo `Option | null`
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value} // Compara opções corretamente
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          error={error}
          helperText={helperText}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "45px", // Altura do input
            },
            "& .MuiInputBase-input": {
              padding: "12px 14px",
              borderRadius: "8px",
              fontSize: "16px",
            },
          }}
        />
      )}
    />
  );
}
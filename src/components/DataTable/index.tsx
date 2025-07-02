import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  gridClasses,
} from "@mui/x-data-grid";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  SxProps,
  Theme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";

const rowHeight = Math.round(window.innerHeight * 0.056); // ~4vh

const WhiteDataGrid = styled(DataGrid)(({ theme }) => ({
  backgroundColor: "white",
  [`& .${gridClasses.cell}`]: {
    backgroundColor: "white",
  },
  [`& .${gridClasses.columnHeaders}`]: {
    backgroundColor: "white",
    borderRadius: "18px 8px 0 0",
  },
  [`& .${gridClasses.columnHeader}`]: {
    backgroundColor: "white",
  },
  [`& .${gridClasses.row}`]: {
    backgroundColor: "white",
    borderRadius: "18px 8px 0 0",
  },
}));

interface GenericDataTableProps {
  rows: any[];
  columns: GridColDef[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onCustomAction?: (row: any) => void;
  hideActions?: boolean;
  height?: string | number;
  sx?: SxProps<Theme>;
}

const ActionMenuCell = ({
  row,
  onEdit,
  onDelete,
  onCustomAction,
}: {
  row: any;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onCustomAction?: (row: any) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            backgroundColor: "white",
            color: "black",
            borderRadius: 1,
            minWidth: 160,
            "& .MuiMenuItem-root": {
              fontWeight: 500,
              fontSize: "1rem",
              "&:hover": { backgroundColor: "#EE8552", color: "white" },
            },
          },
        }}
      >
        {onEdit && (
          <MenuItem
            onClick={() => {
              onEdit(row);
              handleClose();
            }}
          >
            Editar
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem
            onClick={() => {
              onDelete(row);
              handleClose();
            }}
          >
            Excluir
          </MenuItem>
        )}
        {onCustomAction && (
          <MenuItem
            onClick={() => {
              onCustomAction(row);
              handleClose();
            }}
          >
            Ação personalizada
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export function GenericDataTable({
  rows,
  columns,
  onEdit,
  onDelete,
  onCustomAction,
  hideActions = false,
  height = "20rem",
  sx = {},
}: GenericDataTableProps) {
  const enhancedColumns: GridColDef[] = React.useMemo(() => {
    if (hideActions) return columns;
    return [
      ...columns,
      {
        field: "actions",
        headerName: "Ações",
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <ActionMenuCell
            row={params.row}
            onEdit={onEdit}
            onDelete={onDelete}
            onCustomAction={onCustomAction}
          />
        ),
        disableColumnMenu: true,
      },
    ];
  }, [columns, hideActions]);

  return (
    <Paper
      sx={{
        height: "100%",
        width: "99.7%",
        marginLeft:"0.2%",
        paddingLeft: "0 !important",
        paddingRight: "0 !important",
        overflowX: "auto", // habilita scroll horizontal se necessário
        backgroundColor: "white",
        ...sx,
      }}
    >
      <WhiteDataGrid
        rows={rows}
        columns={enhancedColumns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 8 } },
        }}
        pageSizeOptions={[5, 10]}
        rowHeight={rowHeight}
        checkboxSelection
        sx={{
          border: 0,
          fontSize: "1rem",
          "& .MuiDataGrid-cell": {
            fontSize: "1rem",
          },
          "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle": {
            fontSize: "1rem",
            fontWeight: "bold",
          },
          "& .MuiCheckbox-root": {
            color: "#1E6F76",
          },
          "& .MuiTablePagination-root": {
            fontSize: "1rem",
          },
          "& .MuiDataGrid-selectedRowCount": {
            fontSize: "1rem",
          },
        }}
      />
    </Paper>
  );
}

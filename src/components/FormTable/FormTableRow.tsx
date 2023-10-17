import React, { useEffect, useState } from "react";
import { FormTableData } from "../../models/FormTableData";
import { Button } from "antd";

const FormTableRow: React.FC<{
    baseRowData: FormTableData;
    stt: string;
    formDataHandler: Function;
    deleteRow: Function;
}> = ({ baseRowData, stt, formDataHandler, deleteRow }) => {
    const [rowData, setRowData] = useState<FormTableData>(baseRowData);
    console.log(rowData.ten);

    useEffect(() => {
        setRowData(baseRowData);
    }, [baseRowData]);

    // useEffect(() => {
    //     if (rowData.donGia && rowData.soLuongTheoThucNhan) {
    //         setRowData((pre) => {
    //             return {
    //                 ...pre,
    //                 thanhTien: rowData.donGia * rowData.soLuongTheoThucNhan,
    //             };
    //         });
    //     }
    // }, [rowData.donGia, rowData.soLuongTheoThucNhan]);

    useEffect(() => {
        formDataHandler(rowData, Number(stt));
    }, [rowData]);

    return (
        <>
            <tr>
                <td>{stt}</td>
                <td>
                    <input
                        type="text"
                        name="ten"
                        id="ten"
                        value={rowData.ten}
                        onChange={(e) => {
                            console.log(e.target.value);

                            setRowData((pre) => {
                                return {
                                    ...pre,
                                    ten: e.target.value,
                                };
                            });
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        name="maSo"
                        id="maSo"
                        value={rowData.maSo}
                        onChange={(e) => {
                            setRowData((pre) => {
                                return {
                                    ...pre,
                                    maSo: e.target.value,
                                };
                            });
                        }}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="donVi"
                        id="donVi"
                        value={rowData.donViTinh}
                        onChange={(e) => {
                            setRowData((pre) => {
                                return {
                                    ...pre,
                                    donViTinh: e.target.value,
                                };
                            });
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        name="soLuongTheoChungTu"
                        id="soLuongTheoChungTu"
                        value={
                            rowData.soLuongTheoChungTu !== 0
                                ? rowData.soLuongTheoChungTu
                                : ""
                        }
                        onChange={(e) => {
                            setRowData((pre) => {
                                return {
                                    ...pre,
                                    soLuongTheoChungTu: Number(e.target.value),
                                };
                            });
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        name="soLuongTheoThucNhan"
                        id="soLuongTheoThucNhan"
                        value={
                            rowData.soLuongTheoThucNhan !== 0
                                ? rowData.soLuongTheoThucNhan
                                : ""
                        }
                        onChange={(e) => {
                            setRowData((pre) => {
                                return {
                                    ...pre,
                                    soLuongTheoThucNhan: Number(e.target.value),
                                };
                            });
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        name="donGia"
                        id="donGia"
                        value={rowData.donGia !== 0 ? rowData.donGia : ""}
                        onChange={(e) => {
                            setRowData((pre) => {
                                return {
                                    ...pre,
                                    donGia: Number(e.target.value),
                                };
                            });
                        }}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        name="thanhTien"
                        id="thanhTien"
                        value={rowData.thanhTien !== 0 ? rowData.thanhTien : ""}
                        onChange={(e) => {
                            setRowData((pre) => {
                                return {
                                    ...pre,
                                    thanhTien: Number(e.target.value),
                                };
                            });
                        }}
                    />
                </td>
                <td>
                    <Button
                        danger
                        type="primary"
                        onClick={() => {
                            deleteRow(Number(stt));
                        }}
                    >
                        -
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default FormTableRow;

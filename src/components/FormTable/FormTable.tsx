import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormTableData } from "../../models/FormTableData";
import styles from "./FormTable.module.css";
import { Button, AutoComplete } from "antd";
import FormTableRow from "./FormTableRow";
import { NhanSu } from "../../models/NhanSu";
import axios from "axios";

const FormTable: React.FC<{ formTableHandler: Function }> = ({
    formTableHandler,
}) => {
    const baseFormData = {
        id: "",
        ten: "",
        maSo: "",
        donViTinh: "",
        soLuongTheoChungTu: 0,
        soLuongTheoThucNhan: 0,
        donGia: 0,
        thanhTien: 0,
    };
    const [formData, setFormData] = useState<FormTableData[]>([baseFormData]);

    useEffect(() => {
        formTableHandler(formData);
    }, [formData]);

    const formDataHandler = (data: FormTableData, index: number) => {
        setFormData((pre) => {
            const newFormData = pre.map((item, i) => {
                if (i === index - 1) {
                    return data;
                } else return item;
            });
            return newFormData;
        });
    };

    const addMoreRow = useCallback(() => {
        setFormData((pre) => {
            return [...pre, baseFormData];
        });
    }, []);

    const deleteRow = useCallback((index: number) => {
        setFormData((pre) => {
            const newFormData = pre.filter((item, i) => {
                if (index - 1 !== i) {
                    return item;
                }
            });
            console.log(newFormData);
            return newFormData;
        });
    }, []);

    return (
        <div className={styles["form-table"]}>
            <table style={{ marginTop: "60px" }}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>
                            Tên, nhãn hiệu, quy cách, phẩm chất vật tư, dụng cụ
                            sản phẩm hàng hóa
                        </th>
                        <th>Mã số</th>
                        <th>Đơn vị tính</th>
                        <th>Số lượng theo chứng chỉ</th>
                        <th>Số lượng theo thực nhận</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((item, index) => {
                        return (
                            <FormTableRow
                                key={"row" + index + 1}
                                baseRowData={item}
                                stt={`${index + 1}`}
                                formDataHandler={formDataHandler}
                                deleteRow={deleteRow}
                            />
                        );
                    })}
                    <tr>
                        <td></td>
                        <td colSpan={6}>Cộng:</td>
                        <td>
                            {formData.reduce((init, item) => {
                                return init + item.thanhTien;
                            }, 0)}
                        </td>
                    </tr>
                </tbody>
            </table>
            <Button
                type="primary"
                style={{ marginTop: "2px" }}
                onClick={addMoreRow}
            >
                Thêm hàng +
            </Button>
        </div>
    );
};

export default FormTable;

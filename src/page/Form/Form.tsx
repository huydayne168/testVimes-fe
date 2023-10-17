import React, { useMemo, useState, useEffect, useCallback } from "react";
import styles from "./Form.module.css";
import Container from "../../components/Container/Container";
import { FormData } from "../../models/FormData";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

import { AutoComplete, Button, DatePicker, Space } from "antd";
import FormTable from "../../components/FormTable/FormTable";
import { NhanSu } from "../../models/NhanSu";
import axios from "axios";
import { BoPhan } from "../../models/BoPhan";
import { DonVi } from "../../models/DonVi";
import { Kho } from "../../models/Kho";
import { FormTableData } from "../../models/FormTableData";
const Form: React.FC<{}> = () => {
    const [nhanSus, setNhanSus] = useState<NhanSu[]>([]);
    const [donVis, setDonVis] = useState<DonVi[]>([]);
    const [boPhans, setBoPhans] = useState<BoPhan[]>([]);
    const [khos, setKhos] = useState<Kho[]>([]);

    useEffect(() => {
        const getDataFromSv = async () => {
            try {
                const resNhanSu = await axios.get(
                    "http://localhost:8000/api/v1/nhanSu/get"
                );

                setNhanSus(resNhanSu.data);

                const resDonVi = await axios.get(
                    "http://localhost:8000/api/v1/donVi/get"
                );

                setDonVis(resDonVi.data);

                const resBoPhan = await axios.get(
                    "http://localhost:8000/api/v1/boPhan/get"
                );

                setBoPhans(resBoPhan.data);

                const resKho = await axios.get(
                    "http://localhost:8000/api/v1/kho/get"
                );

                setKhos(resKho.data);
                console.log(resKho.data);
            } catch (error) {
                console.log(error);
            }
        };
        getDataFromSv();
    }, []);

    // form data
    const [formData, setFormData] = useState<FormData>({
        id: "",
        donVi: {
            id: "",
            name: "",
        },
        boPhan: {
            id: "",
            name: "",
        },
        thoiGian: "",
        so: 0,
        no: 0,
        co: 0,
        theo: "",
        theoSo: 0,
        ngay: 0,
        thang: 0,
        nam: 0,
        cua: "",
        kho: {
            id: "",
            name: "",
            diaDiem: "",
        },
        tableData: [],
        tong: 0,
        tongSoTienVietBangChu: "",
        soChungTuGoc: 0,
        nguoiLapPhieu: {
            id: "",
            name: "",
        },
        nguoiGiaoHang: {
            id: "",
            name: "",
        },
        thuKho: {
            id: "",
            name: "",
        },
        keToanTruong: {
            id: "",
            name: "",
        },
    });

    const thoiGian = useMemo(() => {
        return new Date(formData.thoiGian);
    }, [formData.thoiGian]);

    const onThoiGianChange = (
        value: DatePickerProps["value"],
        dateString: string
    ) => {
        if (value) {
            setFormData((prev) => {
                return {
                    ...prev,
                    thoiGian: dateString,
                };
            });
        }
    };

    const formTableHandler = useCallback((data: FormTableData[]) => {
        setFormData((pre) => ({ ...pre, tableData: data }));
    }, []);

    const submitHandler = useCallback(async () => {
        console.log(formData);
        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/phieuNhapKho/add",
                {
                    formData,
                }
            );

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }, [formData]);
    console.log(formData);

    // return tsx:
    return (
        <Container>
            <form className={styles["form"]}>
                <div className={styles["heading"]}>
                    <div className={styles["heading-left"]}>
                        <div>
                            <label htmlFor="donVi">Đơn vị: </label>
                            <AutoComplete
                                style={{ width: 200 }}
                                options={donVis.map((donVi) => {
                                    return { value: donVi.name };
                                })}
                                placeholder=""
                                filterOption={(inputValue, option) =>
                                    option!.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                    -1
                                }
                                onChange={(value) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            donVi: donVis.filter((donVi) => {
                                                return donVi.name === value;
                                            })[0],
                                        };
                                    });
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="boPhan">Bộ phận: </label>
                            <AutoComplete
                                style={{ width: 200 }}
                                options={boPhans.map((boPhan) => {
                                    return { value: boPhan.name };
                                })}
                                placeholder="Tìm kiếm bộ phận"
                                filterOption={(inputValue, option) =>
                                    option!.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                    -1
                                }
                                onChange={(value) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            boPhan: boPhans.filter((boPhan) => {
                                                return boPhan.name === value;
                                            })[0],
                                        };
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles["heading-right"]}>
                        <h2>Mẫu số 01 - VT</h2>
                        <p>
                            (Ban hành theo Thông tư số 200/2014/TT-BTC <br />{" "}
                            Ngày 22/12/2014 của Bộ Tài Chính)
                        </p>
                    </div>
                </div>

                <div className={styles["title"]}>
                    <h1>Phiếu Nhập kho</h1>

                    <div className={styles["title-date"]}>
                        <p>
                            Ngày{" "}
                            <span>
                                {thoiGian.getDate()
                                    ? thoiGian.getDate()
                                    : "... "}
                            </span>{" "}
                            tháng{" "}
                            <span>
                                {thoiGian.getMonth()
                                    ? thoiGian.getMonth() + 1
                                    : "... "}
                            </span>{" "}
                            năm{" "}
                            <span>
                                {thoiGian.getFullYear()
                                    ? thoiGian.getFullYear()
                                    : "... "}
                            </span>
                        </p>
                        <DatePicker onChange={onThoiGianChange} />
                    </div>

                    <div className={styles["title-number"]}>
                        <label htmlFor="so">Số:</label>
                        <input
                            type="text"
                            name="so"
                            id="so"
                            onChange={(e) => {
                                setFormData((pre) => {
                                    return {
                                        ...pre,
                                        so: Number(e.target.value),
                                    };
                                });
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="so">Nợ:</label>
                        <input
                            type="text"
                            name="no"
                            id="no"
                            onChange={(e) => {
                                setFormData((pre) => {
                                    return {
                                        ...pre,
                                        no: Number(e.target.value),
                                    };
                                });
                            }}
                        />
                        <label htmlFor="so">Có:</label>
                        <input
                            type="text"
                            name="co"
                            id="co"
                            onChange={(e) => {
                                setFormData((pre) => {
                                    return {
                                        ...pre,
                                        co: Number(e.target.value),
                                    };
                                });
                            }}
                        />
                    </div>
                </div>

                <div className={styles["body"]}>
                    <div className={styles["body-top"]}>
                        <div>
                            <label htmlFor="nguoiGiao">
                                -Họ và tên người giao:{" "}
                            </label>
                            <AutoComplete
                                style={{ width: 200 }}
                                options={nhanSus.map((nhanSu) => {
                                    return { value: nhanSu.name };
                                })}
                                placeholder="Tìm kiếm bộ phận"
                                filterOption={(inputValue, option) =>
                                    option!.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                    -1
                                }
                                onChange={(value) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            nguoiGiaoHang: nhanSus.filter(
                                                (nhanSu) => {
                                                    return (
                                                        nhanSu.name === value
                                                    );
                                                }
                                            )[0],
                                        };
                                    });
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="theoType">-Theo</label>
                            <input
                                type="text"
                                name="theoType"
                                id="theoType"
                                onChange={(e) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            theo: e.target.value,
                                        };
                                    });
                                }}
                            />

                            <label htmlFor="soType">số</label>
                            <input
                                type="number"
                                name="soType"
                                id="soType"
                                className={styles["small-input"]}
                                onChange={(e) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            theoSo: Number(e.target.value),
                                        };
                                    });
                                }}
                            />
                            <label htmlFor="ngayType">ngày</label>
                            <input
                                type="number"
                                name="ngayType"
                                id="ngayType"
                                className={styles["small-input"]}
                                onChange={(e) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            ngay: Number(e.target.value),
                                        };
                                    });
                                }}
                            />
                            <label htmlFor="thangType">tháng</label>
                            <input
                                type="number"
                                name="thangType"
                                id="thangType"
                                className={styles["small-input"]}
                                onChange={(e) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            thang: Number(e.target.value),
                                        };
                                    });
                                }}
                            />
                            <label htmlFor="namType">năm</label>
                            <input
                                type="number"
                                name="namType"
                                id="namType"
                                className={styles["small-input"]}
                                onChange={(e) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            nam: Number(e.target.value),
                                        };
                                    });
                                }}
                            />

                            <label htmlFor="cuaType">của</label>
                            <input
                                type="number"
                                name="cuaType"
                                id="cuaType"
                                onChange={(e) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            cua: e.target.value,
                                        };
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="kho">Nhập tại kho:</label>
                        <AutoComplete
                            style={{ width: 200 }}
                            options={khos.map((kho) => {
                                return { value: kho.name };
                            })}
                            placeholder="Tìm kiếm bộ phận"
                            filterOption={(inputValue, option) =>
                                option!.value
                                    .toUpperCase()
                                    .indexOf(inputValue.toUpperCase()) !== -1
                            }
                            onChange={(value) => {
                                setFormData((pre) => {
                                    return {
                                        ...pre,
                                        kho: khos.filter((kho) => {
                                            return kho.name === value;
                                        })[0],
                                    };
                                });
                            }}
                        />
                        <label htmlFor="diaDiem">địa điểm</label>
                        <input
                            type="text"
                            name="diaDiem"
                            id="diaDiem"
                            defaultValue={
                                formData.kho && formData.kho.diaDiem
                                    ? formData.kho.diaDiem
                                    : ""
                            }
                        />
                    </div>

                    <FormTable formTableHandler={formTableHandler} />

                    <div className={styles["body-bottom"]}>
                        <div>
                            <label htmlFor="tongTienBangChu">
                                Tổng số tiền viết bằng chữa:{" "}
                            </label>
                            <input
                                type="text"
                                name="tongTienBangChu"
                                id="tongTienBangChu"
                                onChange={(e) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            tongSoTienVietBangChu:
                                                e.target.value,
                                        };
                                    });
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="soChungTuGoc">
                                Số chứng từ gốc kèm theo:{" "}
                            </label>
                            <input
                                type="number"
                                name="soChungTuGoc"
                                id="soChungTuGoc"
                                onChange={(e) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            soChungTuGoc: Number(
                                                e.target.value
                                            ),
                                        };
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles["bottom"]}>
                    <div>
                        <p>
                            Ngày{" "}
                            <span>
                                {thoiGian.getDate()
                                    ? thoiGian.getDate()
                                    : "... "}
                            </span>{" "}
                            tháng{" "}
                            <span>
                                {thoiGian.getMonth()
                                    ? thoiGian.getMonth() + 1
                                    : "... "}
                            </span>{" "}
                            năm{" "}
                            <span>
                                {thoiGian.getFullYear()
                                    ? thoiGian.getFullYear()
                                    : "... "}
                            </span>
                        </p>
                    </div>

                    <div className={styles["sign"]}>
                        <div>
                            <label htmlFor="nguoiLapPhieu">
                                Người lập phiếu <br />
                                (Ký và ghi rõ họ tên)
                            </label>
                            <br />
                            <AutoComplete
                                style={{ width: 200 }}
                                options={nhanSus.map((nhanSu) => {
                                    return { value: nhanSu.name };
                                })}
                                placeholder="Tìm kiếm bộ phận"
                                filterOption={(inputValue, option) =>
                                    option!.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                    -1
                                }
                                onChange={(value) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            nguoiLapPhieu: nhanSus.filter(
                                                (nhanSu) => {
                                                    return (
                                                        nhanSu.name === value
                                                    );
                                                }
                                            )[0],
                                        };
                                    });
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="nguoiGiaoHang">
                                Người giao hàng <br />
                                (Ký và ghi rõ họ tên)
                            </label>
                            <br />
                            <input
                                type="text"
                                name="nguoiGiaoHang"
                                id="nguoiGiaoHang"
                                defaultValue={
                                    formData.nguoiGiaoHang &&
                                    formData.nguoiGiaoHang.name
                                        ? formData.nguoiGiaoHang.name
                                        : ""
                                }
                            />
                        </div>

                        <div>
                            <label htmlFor="thuKho">
                                Thủ kho <br />
                                (Ký và ghi rõ họ tên)
                            </label>
                            <br />
                            <AutoComplete
                                style={{ width: 200 }}
                                options={nhanSus.map((nhanSu) => {
                                    return { value: nhanSu.name };
                                })}
                                placeholder="Tìm kiếm bộ phận"
                                filterOption={(inputValue, option) =>
                                    option!.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                    -1
                                }
                                onChange={(value) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            thuKho: nhanSus.filter((nhanSu) => {
                                                return nhanSu.name === value;
                                            })[0],
                                        };
                                    });
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="keToanTruong">
                                Kế toán trưởng <br />
                                (Hoặc bộ phận có nhu cầu nhập) <br /> (Ký và ghi
                                rõ họ tên)
                            </label>
                            <br />
                            <AutoComplete
                                style={{ width: 200 }}
                                options={nhanSus.map((nhanSu) => {
                                    return { value: nhanSu.name };
                                })}
                                placeholder="Tìm kiếm bộ phận"
                                filterOption={(inputValue, option) =>
                                    option!.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                    -1
                                }
                                onChange={(value) => {
                                    setFormData((pre) => {
                                        return {
                                            ...pre,
                                            keToanTruong: nhanSus.filter(
                                                (nhanSu) => {
                                                    return (
                                                        nhanSu.name === value
                                                    );
                                                }
                                            )[0],
                                        };
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

                <Button
                    type="primary"
                    size="large"
                    className={styles["submit-btn"]}
                    onClick={submitHandler}
                >
                    Hoàn Thành
                </Button>
            </form>
        </Container>
    );
};

export default Form;

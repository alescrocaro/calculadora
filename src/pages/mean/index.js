import { Button, Col, Form, InputNumber, Row, Select, Typography } from 'antd';
import React, { useState } from 'react';

import PageLayout from '../../components/layout';

function Mean() {
  const [formFieldsAmount] = Form.useForm();
  const [formEntries] = Form.useForm();

  const [fieldsAmount, setFieldsAmount] = useState(0);
  const [chosenMean, setChosenMean] = useState(0);
  const [fieldsArray, setFieldsArray] = useState([]);
  const [result, setResult] = useState([]);
  const meanOptions = [
    'Aritmética',
    'Geométrica',
    'Harmônica',
    'Aritmética ponderada',
    'Geométrica ponderada',
    'Harmônica ponderada'
  ];

  const { Option } = Select;
  const { Title } = Typography;

  const colSize = { xs: 10, sm: 5, md: 4, lg: 4, xl: 3, xxl: 2 };
  const colSizeConfigFields = {
    xs: 24,
    sm: 10,
    md: 7,
    lg: 7,
    xl: 6,
    xxl: 4
  };

  const fieldsAmountFinish = values => {
    setFieldsAmount(values.inputsAmount);
    setChosenMean(values.meanType);
    const auxArray = [];
    for (let i = 0; i < values.inputsAmount; i++) {
      auxArray.push(i);
    }
    setFieldsArray(auxArray);
  };

  const entriesFinish = values => {
    // console.log(values);
    // console.log(Object.keys(values));
    // console.log(Object.entries(values));

    // console.log(chosenMean);

    // definir qual função usar (provavelmente switch case)
    // chamar a função no case
    // função calcula e devolve o resultado
    let result = 0;
    switch (chosenMean) {
      case 4:
        result = calculateWeightedGeometricMean(Object.entries(values));
        break;

      default:
        result = -1;
        break;
    }

    setResult(result);
  };

  const calculateWeightedGeometricMean = entries => {
    let entriesSum = 0;
    let weightsSum = 0;

    entries.map(item =>
      item[0].startsWith('entry')
        ? (entriesSum += item[1])
        : (weightsSum += item[1])
    );

    let firstStep = 1;
    let aux = 0;

    for (let i = 0; i < entries.length; i += 2) {
      aux = entries[i][1] ** entries[i + 1 /* entries.length / 2 */][1];
      firstStep *= aux;
    }

    const result = firstStep ** (1 / weightsSum);

    return result;
  };

  return (
    <PageLayout>
      <Form
        form={formFieldsAmount}
        layout="vertical"
        autoComplete="off"
        onFinish={fieldsAmountFinish}
      >
        <Row gutter={[12, 0]}>
          <Col {...colSizeConfigFields}>
            <Form.Item
              name="inputsAmount"
              label="Quantidade de entradas"
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!'
                }
              ]}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12, 0]}>
          <Col {...colSizeConfigFields}>
            <Form.Item
              name="meanType"
              label="Tipo de média"
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!'
                }
              ]}
            >
              <Select placeholder="Selecione">
                {meanOptions.map((item, index) => (
                  <Option key={index} value={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          formFieldsAmount.submit();
        }}
      >
        Gerar campos
      </Button>
      {fieldsAmount > 0 && (
        <>
          <Form
            form={formEntries}
            layout="vertical"
            autoComplete="off"
            onFinish={entriesFinish}
            style={{ marginTop: '1rem' }}
          >
            <b>
              <h3>Insira as entradas abaixo:</h3>
            </b>
            {fieldsArray.map((_, index) => (
              <div key={index}>
                <Title level={5}>Dado {index + 1}:</Title>
                <Row gutter={[12, 0]}>
                  <Col {...colSize}>
                    <Form.Item
                      name={`entry${index}`}
                      label="entrada"
                      rules={[
                        {
                          required: true,
                          message: 'Campo obrigatório!'
                        }
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col {...colSize}>
                    {chosenMean >= 3 && (
                      <Form.Item
                        name={`weight${index}`}
                        label="peso"
                        rules={[
                          {
                            required: true,
                            message: 'Campo obrigatório!'
                          }
                        ]}
                      >
                        <InputNumber />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              </div>
            ))}
          </Form>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              formEntries.submit();
            }}
          >
            Calcular
          </Button>
          {result && <h1>{result}</h1>}
        </>
      )}
    </PageLayout>
  );
}

export default Mean;

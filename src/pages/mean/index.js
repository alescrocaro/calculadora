import React, { useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Select } from 'antd';

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
              <Option value={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
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
                <b>
                  <h4>dado {index}:</h4>
                </b>
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
                {chosenMean >= 4 && (
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

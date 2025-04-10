import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import config from '../../../config';
import * as S from './styles';

const certificates = [
  {
    name: "AWS Solution Architect Professional",
    fileName: "aws-sol-arch-pro.png",
  },
  {
    name: "AWS Developer Associate",
    fileName: "aws-dev-ass.png",
  },
  {
    name: "AWS Machine Learning Specialty",
    fileName: "aws-machine-spec.png",
  },
];

const Certificates: FC = () => (
  <S.Certificates>
    <Grid container spacing={4}>
      {certificates.map((cert) => (
        <Grid item lg={4} key={cert.fileName}>
          <S.CertificateCard>
            <S.CertificateImage
              src={`${config.staticUrl}/images/certificates/${cert.fileName}`}
              alt={cert.name}
            />
          </S.CertificateCard>
        </Grid>
      ))}
    </Grid>
  </S.Certificates>
);

Certificates.displayName = 'Certificates';

export default Certificates;

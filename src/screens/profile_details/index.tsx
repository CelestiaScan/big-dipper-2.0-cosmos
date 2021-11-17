import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
  LoadAndExist,
  DesmosProfile,
} from '@components';
import { chainConfig } from '@src/configs';
import { useStyles } from './styles';
import { Connections } from './components';
import { useProfileDetails } from './hooks';

const ProfileDetails = () => {
  const router = useRouter();
  const { t } = useTranslation('profiles');
  const classes = useStyles();
  const {
    state,
  } = useProfileDetails();

  console.log('chainConfig', chainConfig);

  useEffect(() => {
    const regex = /^@/;
    const profileDtag = router.query.dtag as string;
    const regexCheck = regex.test(profileDtag);
    const configProfile = chainConfig.extra.profile;
    // const enabledProfile = state.desmosProfile;
    // enabledProfile == null

    if (!regexCheck || !configProfile) {
      router.replace('/');
    }
  }, []);

  return (
    <>
      <NextSeo
        title={t('profileDetails')}
        openGraph={{
          title: t('profileDetails'),
        }}
      />
      <Layout navTitle={t('profileDetails')}>
        <LoadAndExist
          loading={false}
          exists
        >
          {state.desmosProfile
          && (
          <span className={classes.root}>
            <DesmosProfile
              dtag={state.desmosProfile.dtag}
              nickname={state.desmosProfile.nickname}
              imageUrl={state.desmosProfile.imageUrl}
              bio={state.desmosProfile.bio}
              connections={[]}
              coverUrl={state.desmosProfile.coverUrl}
            />
            <Connections
              data={state.desmosProfile.connections}
            />
          </span>
          )}
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default ProfileDetails;

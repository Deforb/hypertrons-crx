import React, { useState, useEffect } from 'react';

import getGithubTheme from '../../../../helpers/get-github-theme';
import getMessageByLocale from '../../../../helpers/get-message-by-locale';
import optionsStorage, {
  HypercrxOptions,
  defaults,
} from '../../../../options-storage';
import generateDataByMonth from '../../../../helpers/generate-data-by-month';
import ForkChart from './ForkChart';
import { RepoMeta } from '../../../../api/common';

const githubTheme = getGithubTheme();

interface Props {
  forks: any;
  meta: RepoMeta;
}

const View = ({ forks, meta }: Props): JSX.Element | null => {
  const [options, setOptions] = useState<HypercrxOptions>(defaults);

  useEffect(() => {
    (async function () {
      setOptions(await optionsStorage.getAll());
    })();
  }, []);

  if (!forks) return null;

  return (
    <>
      <div className="chart-title">
        {getMessageByLocale('fork_popup_title', options.locale)}
      </div>
      <ForkChart
        theme={githubTheme as 'light' | 'dark'}
        width={270}
        height={130}
        data={generateDataByMonth(forks, meta.updatedAt)}
      />
    </>
  );
};

export default View;

import { useGetStartupConfig } from 'librechat-data-provider/react-query';
import { useLocalize } from '~/hooks';

export default function Footer() {
  const { data: config } = useGetStartupConfig();
  const localize = useLocalize();

  const privacyPolicy = config?.interface?.privacyPolicy;
  const termsOfService = config?.interface?.termsOfService;

  const privacyPolicyRender = privacyPolicy?.externalUrl && (
    <a
      className=" text-gray-500 underline"
      href={privacyPolicy.externalUrl}
      target={privacyPolicy.openNewTab ? '_blank' : undefined} rel="noreferrer"
    >
      {localize('com_ui_privacy_policy')}
    </a>
  );

  const termsOfServiceRender = termsOfService?.externalUrl && (
    <a
      className=" text-gray-500 underline"
      href={termsOfService.externalUrl}
      target={termsOfService.openNewTab ? '_blank' : undefined} rel="noreferrer"
    >
      {localize('com_ui_terms_of_service')}
    </a>
  );

  const mainContentRender = (
    <span>
      {typeof config?.customFooter === 'string' ? (
        config.customFooter
      ) : (
        <>
          <a href="https://librechat.ai" target="_blank" rel="noreferrer" className="underline">
            {config?.appTitle || 'LibreChat'} v0.6.10
          </a>
          {' - '} {localize('com_ui_new_footer')}
        </>
      )}
    </span>
  );

  const footerElements = [mainContentRender, privacyPolicyRender, termsOfServiceRender].filter(
    Boolean,
  );

  return (
    <div className="relative flex items-center justify-center gap-2 px-2 py-2 text-xs text-gray-600 dark:text-gray-300 md:px-[60px]">
      {footerElements.map((contentRender, index) => {
        const isLastElement = index === footerElements.length - 1;

        return (
          <>
            {contentRender}
            {!isLastElement && <div className="h-2 border-r-[1px] border-gray-300" />}
          </>
        );
      })}
    </div>
  );
}

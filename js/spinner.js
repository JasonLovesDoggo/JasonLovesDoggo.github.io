const magicProjectsGrid = new MagicGrid({
        container: "#work_section",
        animate: false,
        gutter: 30, // default gutter size
        static: true,
        useMin: false,
        maxColumns: 2,
        useTransform: true
      });

      const magicForksGrid = new MagicGrid({
        container: "#forks_section",
        animate: false,
        gutter: 30, // default gutter size
        static: true,
        useMin: false,
        maxColumns: 2,
        useTransform: true
      });

      $("document").ready(() => {
        magicProjectsGrid.listen();
        magicForksGrid.listen();
      });